import _ from "../util/public.js";

export default class FileAlias{
  constructor(fileObject){

    if(_.isFile(fileObject)){
      this.createFile(fileObject);
    }else{
      this.createFileFromInput(fileObject.value);
    }
  }

  createFileFromInput(path){
    this.lastModifiedDate = null;
    this.size = null;
    this.type = 'file/' + path.slice(path.lastIndexOf('.') + 1).toLowerCase();
    this.name = path.slice(path.lastIndexOf('/') + path.lastIndexOf('\\') + 2);
  }

  createFile(object){
    this.lastModifiedDate = object.lastModifiedDate;
    this.size = object.size;
    this.type = object.type;
    this.name = object.name;
  }
}
