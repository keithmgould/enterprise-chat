CHAT = (typeof CHAT === "undefined") ? {} : CHAT;

// from Javascript Patterns.
CHAT.namespace = function(ns_string)
{
	var parts = ns_string.split('.'),
		  parent = CHAT,
		  i = 0,
      len;

	if (parts[0] === "CHAT") {
		parts = parts.slice(1);
	}

	len = parts.length;

	for (; i < len; i += 1) {
		var singlePart = parts[i];
		if (typeof parent[singlePart] === "undefined") {
		   parent[singlePart] = {};
		}
		parent = parent[singlePart];

	}
	return parent;
};
