
var Namespace = (function() {

    var _includedIdentifiers = [];

    /**
    * Creates an Object following the specified namespace identifier.
    *
    * @public
    * @param 	String	identifier	The namespace string
    * @param	Object	klasses		(OPTIONAL) An object which properties will be added to the namespace
    * @return	Object				The most inner object
    */
    var _namespace = function(identifier) {
        var klasses = arguments[1] || false;
        var ns = window;

        if (identifier !== '') {
            var parts = identifier.split(Namespace.separator);
            for (var i = 0; i < parts.length; i++) {
                if (!ns[parts[i]]) {
                    ns[parts[i]] = {};
                }
                ns = ns[parts[i]];
            }
        }

        if (klasses) {
            for (var klass in klasses) {
                if (klasses.hasOwnProperty(klass)) {
                    ns[klass] = klasses[klass];
                }
            }
        }

        return ns;
    };

    /**
    * Maps an identifier to a uri. Is public so it can be overriden by custom scripts.
    *
    * @public
    * @param	String	identifier 	The namespace identifier
    * @return	String				The uri
    */
    _namespace.mapIdentifierToUri = function(identifier) {
        var regexp = new RegExp('\\' + Namespace.separator, 'g');
        return Namespace.baseUri + identifier.replace(regexp, '/') + '.js';
    };

    /**
    * Adds methods to javascript native's object
    * Inspired by http://thinkweb2.com/projects/prototype/namespacing-made-easy/
    *
    * @public
    */
    _namespace.registerNativeExtensions = function() {
        /**
        * @see Namespace()
        */
        String.prototype.namespace = function() {
            var klasses = arguments[0] || {};
            return _namespace(this.valueOf(), klasses);
        };
        /**
        * @see Namespace.include()
        */
        String.prototype.mapIdentifierToUri = function() {
            return _namespace.mapIdentifierToUri(this.valueOf(), arguments);
        };
    };

    return _namespace;
})();

/**
* Namespace segment separator
*
* @var String
*/
Namespace.separator = '.';

/**
* Base uri when using Namespace.include()
* Must end with a slash
*
* @var String
*/
Namespace.baseUri = './';

/**
* Whether to automatically call Namespace.include() when Namespace.import() 
* does not find the targeted object.
*
* @var Boolean
*/
Namespace.autoInclude = true;
	
