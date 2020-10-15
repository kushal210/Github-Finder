import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'

import Spinner from '../layout/Spinner';
import Repos from '../repos/Repos'



class User extends Component {
    componentDidMount() {
        this.props.getUser(this.props.match.params.login);
        this.props.getUserRepos(this.props.match.params.login);
    }
    static propTypes = {
        loading: PropTypes.bool.isRequired,
        user: PropTypes.object.isRequired,
        getUser: PropTypes.func.isRequired,
    }
    render() {
        const {
            name,
            company,
            avatar_url,
            location,
            bio,
            blog,
            login,
            html_url,
            followers,
            following,
            public_repos,
            public_gists,
            hireable
        } = this.props.user;
        const { loading, repos } = this.props;
        if (loading)
            return <Spinner />
        return (
            <Fragment>
                <Link to="/" className="btn btn-light">Back to Search</Link>
                <div className="card grid-2">
                    <div className="all-center">
                        <img
                            src={avatar_url}
                            className="round-img"
                            style={{ width: '150px' }}
                        />
                        <h3>{name}</h3>
                        <p>Location: {location} </p>
                    </div>
                    <div>
                        {bio && (
                            <Fragment>
                                <h3>Bio</h3>
                                <p>{bio}</p>
                            </Fragment>
                        )}
                        <a href={html_url} className="btn btn-dark my-1">Visit Github Profile </a>
                        <ul>
                            <li>
                                {login && <Fragment>
                                    <strong>Username: </strong>{login}
                                </Fragment>}
                            </li>
                            <li>
                                {blog && <Fragment>
                                    <strong>Blog: </strong>{blog}
                                </Fragment>}
                            </li>
                            <li>
                                {company && <Fragment>
                                    <strong>Website: </strong>{company}
                                </Fragment>}
                            </li>
                        </ul>
                    </div>
                </div>
                <Repos repos={repos} />
            </Fragment>
        )
    }
}

export default User
