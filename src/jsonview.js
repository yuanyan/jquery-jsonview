/*
 * Jsonview (for jQuery)
 * version: 1.0
 * @requires jQuery v1.2 or later
 * @homepage https://github.com/yuanyan/jQuery-jsonview
 *
 * Licensed under the MIT:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Copyright yuanyan <yuanyan.cao@gmail.com>
 *
 * Usage:
 *
 *  jQuery(document).ready(function() {
 *    jQuery('#view').jsonview('json data');
 *  })
 *
 *  <div id="view"></div>
 *
 *  You can also use it programmatically:
 *
 *    jQuery.jsonview('#view', 'json data');
 *
 *  The jsonview function can aslo render a jsonview use the data response from "request url":
 *
 *  jQuery(document).ready(function() {
 *    jQuery('#view').jsonview({url: 'request url', type: 'post or get', timeout: '20'});
 *  })
 *
 *  You can also use it programmatically:
 *
 *    jQuery.jsonview('#view', {url: 'request url', type: 'post or get', timeout: '20'});
 *
 *
 */
 
(function($) {
	$.jsonview = function(selector, data) {
		var result = $.parseJSON(data);
		var html = '<div class="jsonview">' + view(result) + '</div>';
		$(selector).html(html);
		
		$(".jsonview th").live('click', function(e){
		
			var el=e.srcElement,cls = el.className;
			
			el.className = cls == 'asc' ? 'desc' : (cls == 'desc' ? null : 'asc');
					
			var ids=el.id.split('-'), tId=ids[1], cId=ids[2];
			
			var tbl=tbls[tId].slice(0), 
				h=uniqueKeys(tbl), 
				col=keys(h)[cId], 
				tbody=el.parentNode.parentNode.nextSibling;
				
			if (!el.className){ 
				setTableBody(tbody, makeRows(h,tbls[tId])); 
				return; 
			}
			
			var d=el.className=='asc'?1:-1;
			tbl.sort(function(a,b){ 
				return cmp(a[col],b[col]) * d; 
			});
			
			setTableBody(tbody, makeRows(h,tbl));
		});
	};

  /*
   * Public, $.fn methods
   */

	$.fn.jsonview = function(data) {
		if ($(this).length == 0) return;
		
		
	
	};
	
	function keys(o){ 
		var a=[]; 
		for (var k in o) 
			a.push(k); 
		return a; 
	}
	
	function uniqueKeys(arr){
		var h={}; 
		for (var i=0,len=arr.length; i<len; i++){
			for (var k in arr[i]){
				h[k] = k; 
			}
		}
		return h; 
	}
	
	function cmp(v1, v2){
      var f1, f2, f1=parseFloat(v1), f2=parseFloat(v2);
      if (!isNaN(f1) && !isNaN(f2)) v1=f1, v2=f2;
      if (typeof v1 == 'string' && v1.substr(0,6) == '/Date(') v1=date(v1), v2=date(v2);
      if (v1 == v2) return 0;
      return v1 > v2 ? 1 : -1;
    }
	
	function setTableBody(tbody, html) {
      if (!$.browser.msie) { 
		return tbody.innerHTML = html;
	  }
	  
      var temp = tbody.ownerDocument.createElement('div');
      temp.innerHTML = '<table>' + html + '</table>';
      tbody.parentNode.replaceChild(temp.firstChild.firstChild, tbody);
    }
	
	
	function isDate(){
	
	
	}
	
	function view(val){
		if(val == null) {
			return '';
		}
		if(typeof val === 'number' || typeof val === 'boolean'){
			return ''+val;
		}
		if(isDate(val)){
			return val;
		}
		if(typeof val === 'string'){
			return val;
		}
		
		if($.isArray(val)){
			return arrayView(val);
		
		}
		if($.isPlainObject(val)){
			return objectView(val);
		}
	
	}
	
	function objectView(obj){
	
		var sb = '<dl>';
		for (var k in obj) sb += '<dt class="ib">' + k + '</dt><dd>' + view(obj[k]) + '</dd>';
		sb += '</dl>';
		return sb;
	}
	
	
	var tbls = [];
	
	function arrayView(arr){
	    
		if (typeof arr[0] == 'string' || typeof arr[0] == 'number') return arr.join(', ');
	  
		var id=tbls.length, keys=uniqueKeys(arr);
		
		var sb = '<table id="tbl-' + id + '"><caption></caption><thead><tr>';
	  
		tbls.push(arr);
	  
		var i=0;
		
		for (var k in keys) {
			if(keys.hasOwnProperty(k)){
				sb += '<th id="h-' + id + '-' + (i++) + '"><b></b>' + k + '</th>';
			}
		}
	  
		sb += '</tr></thead><tbody>' + makeRows(keys, arr) + '</tbody></table>';
		return sb;
		
	}
	
	
    function makeRows(keys, arr) {
		var sb = '';
		for (var r=0,len=arr.length; r<len; r++) {
			sb += '<tr>';
		
		var row = arr[r];
        for (var k in keys) sb += '<td>' + view(row[k]) + '</td>';
        sb += '</tr>';
      }
      return sb;
    }


})(jQuery);
