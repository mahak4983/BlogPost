import React, { Component, Fragment} from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'reactstrap';
import about from '../images/about.svg'
import posts from '../images/posts.svg'
import './styles/start.css'
class Start extends Component{

render() {
    return(
        <Fragment>
             <div className="contain darken-pseudo darken-with-text">
                <h1 className="fade-in">
                    Blog Post
                </h1>
                <br/>
                <p className="fade-in">
                    Minimized Simplicity
                </p>
              </div>
              <div className="container-fluid">
                <div className="row">
                    <div className="col-xs-12 col-md-6" >
                        <h1 className="card-title">About</h1>
                        <img src={about}/>
                        <br/>
                        <Button color="link" size="lg" style={{margin:10}}>
                            <Link to ="/about">Know more</Link>
                         </Button>

                    </div>
                    <div className="col-xs-12 col-md-6" >
                        <h1 className="card-title">Posts</h1>
                        <img src={posts}/>
                        <br/>
                        <br/>
                        <Button color="link" size="lg" style={{margin:10}}>
                            <Link to ="/posts">Know more</Link>
                        </Button>
                    </div>
                </div>
              </div>
              <div className="footer">
                <h1>Follow along the journey</h1>
                <p>Follow me on social and never miss a post from this blog. Only original
                <br/> content
                    and minimalist views, shared daily on social.</p>
                <br/>
                <br/>
                <div className="container">
                    <div className="row justify-content-between footer-social">

                        <div className="col footer-social-item">
                            <a className="footerlink" href="">
                                <i className="fab fa-instagram"></i>
                            </a>
                        </div>

                        <div className="col footer-social-item">
                            <a className="footerlink" href="">
                                <i className="fab fa-facebook"></i>
                            </a>
                        </div>
                        
                        <div className="col footer-social-item">
                            <a className="footerlink " href="">
                                <i className="fab fa-twitter"></i>
                            </a>
                        </div>
                    </div>
                </div>
                
              </div>
        </Fragment>
    )
}

}

export default Start;