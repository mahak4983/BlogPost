import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Button, Spinner } from 'reactstrap';

import './post.css'

class Post extends Component{
  
    state={
          isAuth:false,
          token:null,
          isForm:false,
          isError: false,
          posts: [],
          postPage:localStorage.getItem('page')||1,
          totalPosts: 0,
          isLoading:true,
          btnTxt:'Admin Login',
          adForm:false,
        

    }
    componentDidMount(){
        //fetchingposts

        const token = localStorage.getItem('token');
    const expiryDate = localStorage.getItem('expiryDate');
    localStorage.removeItem('page');

            // const page = localStorage.getItem('page')||1;
            
    if (!token || !expiryDate) {
        // this.setState({postPage:page});
  
       this.loadBlogs();

      return;
    }
    if (new Date(expiryDate) <= new Date()) {
      this.logout();
    //   this.setState({postPage:page});

      this.loadBlogs();

      return;
    }
 
    const remainingMilliseconds =
      new Date(expiryDate).getTime() - new Date().getTime();
    this.setState({ isAuth: true, token: token, btnTxt:'Logout' });
    this.setAutoLogout(remainingMilliseconds);
      
       this.loadBlogs();

    }

    loadBlogs = (direction) => {

        if(direction) {
            this.setState({
            posts: []
            })
        }
         let page = this.state.postPage;
    

        
        if(direction === 'next') {
            page++;

            this.setState({ postPage: page })
        }
        if(direction === 'previous') {
            page--;
           

            this.setState({ postPage: page })

        }
        localStorage.setItem('page', page);

        fetch('blogs?page=' + page,{
            headers:{
                'Content-type' : 'application/json'
            }
        }).then(res => {
            return res.json();
        })
        .then(resData => {
           
            this.setState({
                posts: resData.blogs,
                totalPosts: resData.totalItems,
                isLoading:false
            })
        })

    }

    submitHandler = (e) => {
        e.preventDefault();
            var heading = e.target.Heading.value;
            var content = e.target.Content.value;
            if(heading && content) 
            {

               // console.log(e.target.Heading.value, e.target.Content.value);
                this.setState({
                    
                    isForm:false,
                    isError:false
                })
                fetch('add-blog',{
                    method: 'POST',
                    headers:{
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify({
                        heading:heading,
                        content: content
                    })
                })
                .then(res => {
                    return res.json();
                }).then(resData => {
                    this.loadBlogs();
                    console.log(resData);
                    
                })
                
            }
            else {
                this.setState({
                    isError:true
                })
            }
    }

    showFormHandler = () => {
      this.setState({
          isForm:true
      })
    }
    cancelForm = () => {
        this.setState({
            isForm:false,
            isError:false
        })
      
    }
 
     adminForm = () =>{
         if(this.state.btnTxt === 'Logout') {
             return this.logout();
         }
         this.setState({
             adForm:true,
         })
     }
     cancelAdForm = () => {
         this.setState({
             adForm:false,
             isError:false,
         })
     }
     adFormLogin = (e) =>{
         e.preventDefault();
            const userId = e.target.userId.value;
            const password = e.target.password.value;
            fetch('login',{
                method:'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId:userId,
                    password: password
                })
            })
            .then(res =>{
                if(res.status !== 200 && res.status !== 201){
                     throw new Error('Login failed')

                }
                return res.json();
            })
            .then(resData =>{
                console.log(resData);
             this.setState({
                 isError:false,
                 adForm:false,
                 isAuth:true,
                 token:resData.token,
                 btnTxt:'Logout'
             });
             localStorage.setItem('token', resData.token);
             const remainingTime = 60*60*1000;
             const expiryDate = new Date(
                 new Date().getTime() + remainingTime
             );
             localStorage.setItem('expiryDate', expiryDate.toISOString());
            // this.setAutoLogout(remainingTime);
            })
            .catch(err =>{
                console.log('Error')
                this.setState({
                    adForm:true,
                    isAuth:false,
                    isError:true,
                    btnTxt:'Admin Login'
                })
            });
     }
     logout = () =>{
         this.setState({
             isAuth:false,
             token:null,
             btnTxt:'Admin Login',
             adForm:true,

         })
         localStorage.removeItem('token');
         localStorage.removeItem('expiryDate');
         localStorage.removeItem('userId');
         localStorage.removeItem('page');

     }
     setAutoLogout = milliseconds => {
        setTimeout(() => {
          this.logout();
        }, milliseconds);
      };

    render() {
        
        return(
            <Fragment>
                {this.state.isLoading && (
                    <div className="container" style={{textAlign: "center"}}>

                        <Spinner color="info" style={{ width: '3rem', height: '3rem' }} />
                    </div>
                )}
                {(!this.state.isForm && !this.state.isLoading && !this.state.adForm) && (
              <div>

                <div className="contains1 darken-pseudo darken-with-text" >
                    <h1 className="fade-in">
                        Blogs
                    </h1>

                    <br/>
                </div>
               <div className="container-fluid" style={{textAlign: "center", padding:50}}>

                       {/* posts */}

                       
                       
                       {/* With supporting text below as a natural lead-in to additional content. */}

                       {this.state.posts.map(blog => {
                         return <div className="card text-center">
                         <div className="card-body">
                           <h5 className="card-title">{blog.heading}</h5>
                       <p className="card-text">{blog.content.substring(0,50)+"...."}</p>
                           <Link to={blog._id}> Read More...</Link>
                         </div>
                       </div>
                       })}
                       
                       
                    
                       {/* pagination buttons */}
                       <br/>
                        {this.state.postPage > 1 && (
                        

                            <Button outline color="info" onClick={() => {this.loadBlogs('previous')}}> Prev</Button>
                        
                        )}
                        {" "} {" "}
                        {this.state.postPage < Math.ceil(this.state.totalPosts / 3) && (

                      <Button outline color="info" onClick={() => {this.loadBlogs('next')}}>Next</Button>
                        )}

                      {/* show form */}
                         {this.state.isAuth && (
                        <div>
                           <br/>
                           
                            <Button outline color="info" onClick={this.showFormHandler}>Submit New Entry</Button>
                        </div>
                         )}
                      <br/>
                      <br/>
                        <Button outline color="info" onClick={this.adminForm} >{this.state.btnTxt}</Button>
               </div>

              </div>      
                       )}
                  
                  
                  {(this.state.isForm && !this.state.isLoading && !this.state.adForm) && (
                      
                      <div className="container" style={{textAlign: "center"}}>
                      
                      {/* form */}
                         {this.state.isError && (
                             <div className="error-handler">
                                 Invalid Input
                             </div>    
                         )}
                      <form onSubmit={this.submitHandler}>
                            <div className = "form-group">
                                    <label for="Heading" style={{fontSize:25}}>Heading</label>
                                    <textarea className="form-control" id="Heading" rows="1" ></textarea>
                            </div>
                            <div className = "form-group">
                                    <label for="Content" style={{fontSize:25}}>Content</label>
                                    <textarea className="form-control" id="Content" rows ="6"></textarea>
                            </div>
                        <Button outline color="danger" onClick={this.cancelForm}>Close</Button>{' '} 
                        <Button outline color="success" type="submit">Submit</Button>{' '}
                        </form>
                       </div>
               )}
               {(this.state.adForm && !this.state.isLoading) &&(
                   <div className="container" style={{textAlign: "center"}}>
                       {this.state.isError && (
                             <div className="error-handler">
                                 Login Failed
                             </div>    
                         )}

                   <form onSubmit = {this.adFormLogin}>
                         <div className = "form-group">
                                 <label for="userId" style={{fontSize:25}}>User-Name</label>
                                 <textarea className="form-control" id="userId" rows="1" ></textarea>
                         </div>
                         <div className = "form-group">
                         <label for="password">Password</label>
                          <input type="password" className="form-control" id="password"/>
                         </div>
                     <Button outline color="danger" onClick={this.cancelAdForm}>Close</Button>{' '} 
                     <Button outline color="success" type="submit">Submit</Button>{' '}
                     </form>
                    </div>
               )}
                    
                   

              </Fragment>
        );
    }
}

export default Post;