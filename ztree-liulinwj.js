/**
 * @author Liulinwj
 * @licence MIT
 */
;(function($, ztree) {

  if (!ztree) {
    return;
  }

  let {
    makeNodeLineClassEx,
    replaceSwitchClass,
    makeNodeIcoClass,
    replaceIcoClass,
    asyncNode,
  } = ztree._z.view;


  function restore() {
    Object.assign(ztree._z.view, {
      makeNodeLineClassEx,
      replaceSwitchClass,
      makeNodeIcoClass,
      replaceIcoClass,
      asyncNode,
    });
    return ztree;
  }


  function beautify({
    ZTREE_SWITCH_OPEN  = "fa fa-caret-down",
    ZTREE_SWITCH_CLOSE = "fa fa-caret-right",
    ZTREE_ICON_OPEN    = "fa fa-folder-open",
    ZTREE_ICON_CLOSE   = "fa fa-folder",
    ZTREE_ICON_DOC     = "fa fa-reorder",
    ZTREE_ICON_ASYNC   = "fa fa-spinner fa-spin",
  } = {}) {

    ztree._z.view.asyncNode = function(setting, node, isSilent, callback) {
      let result = asyncNode(setting, node, isSilent, callback);
      if (node) {
        $(`#${node.id}_ico`).addClass(ZTREE_ICON_ASYNC);
      }
      return result;
    };

    ztree._z.view.makeNodeLineClassEx = function(treeNode) {
      let result = makeNodeLineClassEx(treeNode);
      if (treeNode.children || treeNode.isParent) {
        let iconClass = treeNode.open ? ZTREE_SWITCH_OPEN : ZTREE_SWITCH_CLOSE;
        return `${result} ${iconClass} `;
      }
      return result;
    };

    ztree._z.view.replaceSwitchClass = function(node, obj, newName) {
      replaceSwitchClass(node, obj, newName);
      switch (newName) {
        // If icon classes contains more than one part,
        // use toggle class will make public parts removed.
        case "open":
          $(obj).removeClass(ZTREE_SWITCH_CLOSE).addClass(ZTREE_SWITCH_OPEN);
          break;
        case "close":
          $(obj).removeClass(ZTREE_SWITCH_OPEN).addClass(ZTREE_SWITCH_CLOSE);
          break;
        default:
      }
    };

    ztree._z.view.makeNodeIcoClass = function(setting, node) {
      let result = makeNodeIcoClass(setting, node);
      if (result.includes("ico_docu")) {
        return result + " " + (node.icon || ZTREE_ICON_DOC);
      }
      if (result.includes("ico_close")) {
        return result + " " + (node.iconClose || node.icon || ZTREE_ICON_CLOSE);
      }
      if (result.includes("ico_open")) {
        return result + " " + (node.iconOpen || node.icon || ZTREE_ICON_OPEN);
      }
      return result;
    };

    ztree._z.view.replaceIcoClass = function(node, obj, newName) {
      replaceIcoClass(node, obj, newName);
      switch (newName) {
        case "open":
          $(obj).removeClass(node.iconClose || node.icon || ZTREE_ICON_CLOSE)
                .addClass(node.iconOpen || node.icon || ZTREE_ICON_OPEN);
          break;
        case "close":
          $(obj).removeClass(node.iconOpen || node.icon || ZTREE_ICON_OPEN)
                .addClass(node.iconClose || node.icon || ZTREE_ICON_CLOSE);
          break;
        default:
      }
    };

    return ztree;
  }

  return Object.assign(ztree, { beautify, restore });

})(jQuery, jQuery && jQuery.fn.zTree);
