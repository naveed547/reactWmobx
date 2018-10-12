import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Link } from 'react-router-dom';
const Issue = ({ number, state, title, user, closed_at, updated_at, comments, repository_url }) => {
	let issueRepo = repository_url.split("/repos/")[1].split("/");
	return (
	  <li
	      className="list-group-item"
	      key={number}>
	      	<div>
				<i className={state === 'open' ? 'fa fa-exclamation-circle text-danger':'fa fa-check text-success'}></i>
				<Link className="issue-title" to={`/issue/${issueRepo[0]}/${issueRepo[1]}/${number}`}>&nbsp;&nbsp;{title}</Link>
			</div>              
			<span className="issue-desc">
				#{number} {state ==='open' ? 'opened':'closed'} {moment(state === 'open' ? updated_at : closed_at).fromNow()} by {user.login}
				<i className="fa fa-comments pl-1"></i> {comments}
			</span>
			<span className="pl-2">Last updated at {moment(updated_at).fromNow()}</span>
	    </li>
	)
}

Issue.propTypes = {
	number: PropTypes.number.isRequired,
	state: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	updated_at: PropTypes.oneOfType([
		PropTypes.string.isRequired,
		PropTypes.instanceOf(Date).isRequired
	]),
	closed_at: PropTypes.oneOfType([
		PropTypes.string.isRequired,
		PropTypes.instanceOf(Date).isRequired
	]),
	user: PropTypes.object.isRequired,
	comments: PropTypes.number.isRequired
}

export default Issue