import React,{ Component, Fragment } from 'react'
import './singlepost.css'
import { Spinner, Button } from 'reactstrap';


class SinglePost extends Component {
    state = {
        isAuth:false,
        blog: null,
        isLoading: true,
        showComment:false,
        comments:[],
    }

    componentDidMount(){
       // console.log(this.props.match.params.blogId);
       const blogId = this.props.match.params.blogId;
       const token = localStorage.getItem('token');
       const expiryDate = localStorage.getItem('expiryDate');
       if( token && expiryDate ){
           this.setState({isAuth:true});
       }
       fetch('' + blogId,{
           headers:{
               'Content-Type': 'application/json'
           }

       })
       .then(res => {
            return res.json()
        })
            .then(resData => {
               return this.setState({
                    blog: resData.blog,
                    isLoading:false,
                    
                })
               
            })
            .then(result => {
                this.allComments();
            })
            

        }
        addComment = () => {
            this.setState({
                showComment:true,
            })
        }

        allComments = () => {
            const blogId = this.props.match.params.blogId;
            fetch('comment/'+ blogId,{
               headers:{
                'Content-Type': 'application/json'
                   
               }
            })
            .then(res => {
                return res.json();
            })
            .then(resData =>{
                this.setState({
                    comments: resData.comments
                })
            })
        }

        commentHandler = (e) => {
            e.preventDefault();
            const name = e.target.name.value;
            const comment = e.target.comment.value;
            const blogId = this.props.match.params.blogId;
            //console.log(e.target.name.value, e.target.comment.value);
            // this.setState({
            //     showComment:false
            // })
            fetch('comment',{
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({
                    name:name,
                    comment: comment,
                    blogId: blogId
                })

            })
            .then(res => {
                return res.json();
            })
            .then(resData => {
                this.allComments();
                this.setState({
                    showComment:false
                })
               
            })
            .catch(err => {
                console.log(err);
            })
        }
        closeForm = () => {
            this.setState({
                showComment: false
            })
        }
        delComent = (commentId) =>{
            fetch('delete/'+commentId,{
                method:'DELETE',

            }).then(res =>{
                return res.json();
            })
            .then(resData =>{
                this.allComments();
            })
        }
        

        render() {
            

        return(
            <Fragment>
            {this.state.isLoading && (
               <div className="container" style={{textAlign: "center"}}>
                <Spinner color="info" style={{ width: '3rem', height: '3rem' }} />
               </div>
                )}
                {(!this.state.isLoading&&this.state.x!==null) && (
               <div>

                <div className={`contains5 darken-pseudo darken-with-text`}>
                     <h1 className="fade-in">
                        {this.state.blog.heading}
                    </h1>
                    <br/>
                 
                </div>
                <div className="container" style={{textAlign: "center"}}>

                    <p style={{margin:30}}>  
                        {this.state.blog.content}
                        <br/>
                        <br/>
                        <br/>
                        <hr/>   
                    </p>
                    {/* <div className="comment-section" style={{marginBottom:8}}> <h1 style={{fontSize:25}}>Comments</h1></div>
                    {this.state.comments.map(comment=>{
                       return <div className="comment-section">
                           
                              <div className="comment-head">{comment.name}</div>
                              <div className="comment-content">{comment.comment}</div>
                              <div>__________________</div>
                           </div>

                    })} */}
                    {!this.state.showComment && (

                    <Button color="link" onClick={this.addComment}>Add a Comment</Button>


                    )}
                    {this.state.showComment && (
                        
                            <div >
                                <form onSubmit={this.commentHandler}>
                                    <div className="form-row" >
                                        <div className="col-md-3"></div>
                                        <div className="form-group col-md-6">
                                            <label for = "name"> Full Name</label>
                                            <input type="text" className="form-control" id="name" placeholder="Fullname"/>
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="col-md-3"></div>
                                        <div className="form-group col-md-6">
                                            <label for = "comment"> Comment</label>
                                            <input type="text" className="form-control" id="comment" placeholder="Your Comment" rows="4"/>
                                        </div>
                                    </div>
                                    <Button outline color="success" type="submit" >Add</Button>{" "}
                                    <Button outline color="danger" onClick={this.closeForm}>Close</Button>

                                </form>
                            </div>   
                        
                    )}
                                        <div className="comment-section" style={{marginBottom:8}}> <h1 style={{fontSize:25}}>Comments</h1></div>

                                        {this.state.comments.length===0&&(
                                            <h4>No Comments yet!</h4>
                                        )}
                    {this.state.comments.map(comment=>{
                       return <div className="comment-section">
                           
                              <div className="comment-head">{comment.name}</div>
                              <div className="comment-content">{comment.comment}</div>
                              {this.state.isAuth && (
                                    <Button color="link" onClick={ ()=>{this.delComent(comment._id)}}>Delete</Button>
                                  
                              )}
                              <div>__________________</div>
                           </div>

                    })}

                </div>
               </div>
                )}
                </Fragment>
        );
    }
}
export default SinglePost;