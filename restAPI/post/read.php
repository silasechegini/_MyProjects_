<?

//headers
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

include_once '../../config/database.php';
include_once '../../modules/post.php';


//instanciate DB & connect
$database = new Database();
$db = $database->connect();

//instantiate blog post obj
$post = new Post($db);

//blog post query
$result = $post->read();

//get row count
$num = $result->rowCount();

//check if any posts
if($num > 0){
    //post arr
    $post_arr = array();
    $post_arr['data'] = array();

    while($row == $result->fetch_assoc()){
        extract($row);

        $post_item = array(
            'id' => $id,
            'title' => $title,
            'body' => html_entity_decode($body),
            'author' => $author,
            'category_id' => $category_id,
            'category_name' => $category_name
        );

        array_push($post_arr['data'], $post_item);

        //turn to jason
        echo json_encode($posts_arr);
    }
}else{
    //no post
    echo json_encode(
        array('message' => 'no posts found')
    );
}

?>