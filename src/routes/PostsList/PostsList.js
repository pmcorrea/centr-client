import React, {Component} from 'react'

// Components and services
import Post from '../../components/Post/Post'
import MainContext from '../../contexts/MainContext'
import {getPostsForFolder} from '../../services/posts-helpers'

// Style
import './PostsList.css'

export default class PostsList extends Component {
	static contextType = MainContext;

	componentDidMount() {
		this.context.getData()
	}

	render() {
		const folderId = this.props.match.params.folderId;
		let posts = this.context.posts;

		if (folderId) {
			posts = posts ? getPostsForFolder(posts, parseInt(folderId)) : {};
		}

		return posts ? (
			<section className="PostsList">
				<p className="section_headers">Notes</p>
				
				<ul className="PostList_ul">
					{posts.map(post => (
						<li key={post.id}>
							<Post
								id={post.id}
								name={post.post_name}
								visibility={post.visibility}
								modified={post.modified}
								history={this.props.history}
							/>
						</li>
					))}
				</ul>
			</section>
		) : ('');
	}
}

PostsList.defaultProps = {
	posts: []
};
