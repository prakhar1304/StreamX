class ApiResponse
{   
    //constructor --> acc to data  override 
    constructor(data , messsage ="Success" ,  statusCode){
   
        this.statusCode = statusCode
        this.data =data
        this.messsage = messsage
        this.success = statusCode <400
    }
}


export {ApiResponse}