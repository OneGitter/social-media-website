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

    let convertPostsToAjax = function(){
        $('#posts-list-container>ul>li').each(function(){
            let self = $(this);
            let deleteButton = $(' .delete-post-button', self);
            deletePost(deleteButton);

            // get the post's id by splitting the id attribute
            let postId = self.prop('id').split("-")[1]
            new PostComments(postId);
        });
    }

    createPost();
    convertPostsToAjax();
}