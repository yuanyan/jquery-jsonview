# jquery-jsonview

jQuery v1.2 or later

##Usage
```
jQuery(document).ready(function() {
    jQuery('#view').jsonview('json data');
})

<div id="view"></div>
```
You can also use it programmatically:
```
jQuery.jsonview('#view', 'json data');
```
The jsonview function can aslo render a jsonview use the data response from "request url":
```
jQuery(document).ready(function() {
    jQuery('#view').jsonview({url: 'request url', type: 'post or get', timeout: '20'});
})
```
You can also use it programmatically:
```
jQuery.jsonview('#view', {url: 'request url', type: 'post or get', timeout: '20'});
```	
	
## License

Copyright yuanyan <yuanyan.cao@gmail.com> under the MIT
http://www.opensource.org/licenses/mit-license.php

