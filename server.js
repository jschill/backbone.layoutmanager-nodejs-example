// Dependencies loaded and attached correctly.
var express = require("express");
var Backbone = require("backbone");
var LayoutManager = require("backbone.layoutmanager");

// Main config for backbone.layoutmanager
LayoutManager.configure({
	manage: true,
	prefix: "templates/"
});

/**
 * Backbone for list
 */
var PostsList = Backbone.View.extend({
	manage: true,
	template: "posts/list.html",
	render: function (manage) {
		var self = this,
			postsItem;

		this.collection.each(function (post) {
			postsItem = new PostsItem({model: post})

			self.$el.append(postsItem.render().$el.html());
		}, this);
		return this.$el.html();
	}
});

/**
 * Backbone view for each list item
 */
var PostsItem = Backbone.View.extend({
	manage: true,
	template: "posts/item.html",

	tagName: 'li',
 
	serialize: function () {
		return { post: this.model.attributes };
	}
});

/**
 * Boot up express and add main route
 */
var app = express();
app.get("/", function (req, res) {
	// Collection with information for the posts
	var posts = new Backbone.Collection([
		{ url: "#post1", title: "My first post" },
		{ url: "#post2", title: "My second post" },
		{ url: "#post3", title: "My third post" }
	]);

	// Layout
	var page = new Backbone.Layout({
		template: "page.html",
		views: {
			".posts": new PostsList({ collection: posts })
		}
	});
	res.send(page.render().$el.html());
});

console.log('Example running, check out http://localhost:8000');

app.listen(8000);