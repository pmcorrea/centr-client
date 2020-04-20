import React, { Component } from "react";
import PublicPost from "../../components/PublicPost/PublicPost";
import MainContext from "../../contexts/MainContext";

export default class PublicPostRoute extends Component {
	static contextType = MainContext;

	constructor() {
		super()
		this.state = {
			publicPosts: [],
			touched: false
		}
	}

	render() {
		const postId = this.props.match.params.postId;
		let publicPosts = this.context.publicPosts ? this.context.publicPosts : []
		let post;

		if (publicPosts.length) {
			post = publicPosts.filter(x => x.id === parseInt(postId))
		}

		return post 
		? (
			<div className="PublicPostRoute">
				<PublicPost
					id={post[0].id}
					name={post[0].post_name}
					modified={post[0].modified}
					history={this.props.history}
					visibility={post[0].visibility}
					avatar={post[0].avatar}/>

				<div className="PublicPostRoute__content">
					{post[0].content.split(/\n \r|\n/).map((para, i) => (
						<p className="PublicPostRoute__content" key={i}>{para}</p>
					))}
				</div>
			</div>)
		: ( "" );
	}
}

PublicPostRoute.defaultProps = {
	publicPost: {
		content: ""
	}
};
