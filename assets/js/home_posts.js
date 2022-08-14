{   
    // method to submit the form data for new post using AJAX
    let createPost = function(){
        let newPostForm = $('#new-post-form');

        newPostForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                type: 'post',
                url: '/posts/create',
                data: newPostForm.serialize(),
                success: function(data){
                    console.log(data);
                    let newPost = newPostDom(data.data);
                    $('#post-list-container>ul').prepend(newPost);
                    new Noty({
                        theme : 'relax' , 
                        text: "Post Created",
                        type: 'sucess',
                        layout : "topCenter",
                        timeout : 1500
                        
                        }).show();
                    deletePost($(' .delete-post-button', newPost));
                }, error: function(error){
                    console.log(error.responseText);
                }
            });
        });
    }


    // method to create a post in DOM
    let newPostDom = function(data){
        return $(`<li id="post-${data.post._id}">
                    <p>
                        
                        <small>
                            <a class="delete-post-button"  href="/posts/delete/${ data.post._id }">X</a>
                        </small>
                       
                        ${ data.post.content }
                        <br>
                        <small>
                        ${ data.user_name }
                        </small>
                    </p>
                    <div class="post-comments">
                        
                            <form action="/comments/create"    
                            id="new-comment-form" method="POST">
                                <input type="text" name="content" placeholder="Type Here to add comment..." required>
                                <input type="hidden" name="post" value="${ data.post._id }" >
                                <input type="submit" value="Add Comment">
                            </form>
               
                
                        <div class="post-comments-list">
                            <ul id="post-comments-${ data.post._id }">
                                
                            </ul>
                        </div>
                    </div>
                    
                </li>`)
    }


    // method to delete a post from DOM
    let deletePost = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    $(`#post-${data.data.post_id}`).remove();
                    new Noty({
                        theme : 'relax' , 
                        text: "Post Deleted",
                        type: 'sucess',
                        layout : "topCenter",
                        timeout : 1500
                        
                        }).show();
                },error: function(error){
                    console.log(error.responseText);
                }
            });

        });
    }

    // method to submit the form data for new comment using AJAX
    let createComment = function(){
        let newCommentForm = $('#new-comment-form');

        newCommentForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                type: 'post',
                url: '/comments/create',
                data: newCommentForm.serialize(),
                success: function(data){
                    console.log(data);
                    let newComment = newCommentDom(data.data.comment);
                    $(`#post-comments-${data.data.post_id}`).prepend(newComment);
                    new Noty({
                        theme : 'relax' , 
                        text: "Comment Created",
                        type: 'sucess',
                        layout : "topCenter",
                        timeout : 1500
                        
                        }).show();
                    deleteComment($(' .delete-comment-button', newComment));
                }, error: function(error){
                    console.log(error.responseText);
                }
            });
        });
    }

    // method to create a comment in DOM
    let newCommentDom = function(comment){
        return $(`<li id="comment-${comment._id}">
            <small>
                <a class="delete-comment-button" href="/comments/delete/${comment._id}">X</a>
            </small>
        <p>
            ${comment.content}
            <br>
            <small>
                ${comment.user.name}
            </small>
        </p>
    </li>`)
    }

    // method to delete a post from DOM
    let deleteComment = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    $(`#comment-${data.data.post_id}`).remove();
                    new Noty({
                        theme : 'relax' , 
                        text: "Comment Deleted",
                        type: 'sucess',
                        layout : "topCenter",
                        timeout : 1500
                        
                        }).show();
                },error: function(error){
                    console.log(error.responseText);
                }
            });

        });
    }


    createPost();
    createComment();
}