<?php
//error_reporting(E_ALL);
header("content=text/html; charset=utf-8");
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, Accept, Authorization, X-Request-With');
header('Access-Control-Allow-Credentials: true');
$uf = $_FILES['file'];
if(!$uf){
  echo "no fileToUpload index";
  exit();
}
$upload_file_temp = $uf['tmp_name'];
$upload_file_name = $uf['name'];

if(!$upload_file_temp){
  print_r($uf);
  echo "上传失败";
  exit();
}
$file_size_max = 1024*1024;// 1M限制文件上传最大容量(bytes)
// 检查文件大小
if ($upload_file_size > $file_size_max) {
  echo "对不起，你的文件容量超出允许范围：".$file_size_max;
  exit();
}
$store_dir = "./upload/";// 上传文件的储存位置
$accept_overwrite = 0;//是否允许覆盖相同文件
$file_path = $store_dir . $upload_file_name;
// 检查读写文件
if (file_exists($file_path) && !$accept_overwrite) {
  echo "存在相同文件名的文件";
  exit();
}

//复制文件到指定目录
// if (!move_uploaded_file($upload_file_temp,$file_path)) {
//   echo "复制文件失败".$upload_file_temp." to ". $file_path;
//   exit;
// }

// Echo "<p>你上传了文件:";
// echo $upload_file_name;
// echo "<br>";
//客户端机器文件的原名称。

// Echo "文件的 MIME 类型为:";
// echo $uf['type'];
//文件的 MIME 类型，需要浏览器提供该信息的支持，例如“image/gif”。
//echo "<br>";

//Echo "上传文件大小:";
//echo $uf['size'];
//已上传文件的大小，单位为字节。
//echo "<br>";

//Echo "文件上传后被临时储存为:";
//echo $uf['tmp_name'];
//文件被上传后在服务端储存的临时文件名。
//echo "<br>";

$error = $uf['error'];
switch($error){
case 0:
  echo(json_encode($uf)); break;
case 1:
  Echo "上传的文件超过了 php.ini 中 upload_max_filesize 选项限制的值."; break;
case 2:
  Echo "上传文件的大小超过了 HTML 表单中 MAX_FILE_SIZE 选项指定的值。";break;
case 3:
  Echo "文件只有部分被上传";break;
case 4:
  Echo "没有文件被上传";break;
}
exit()
?>