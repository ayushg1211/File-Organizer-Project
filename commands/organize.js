// Organize Function will organize all your target folder's files in a different folders acc to their extensions

const fs = require('fs') ;
const path = require('path') ;


let types = {media: ["mp4", "mkv", "mp3"],
             archives: ["zip", "7z", "rar", "tar", "gz", "ar", "iso", "xz"],
             documents: [
                 "docx",
                 "doc","pdf",
                 "xlsx",
                 "xls",
                 "odt",
                 "ods",
                 "odp",
                 "odg",
                 "odf",
                 "txt",
                 "ps",
                 "tex",
                ],
             app: ["exe", "dmg", "pkg", "deb"],
             images: ["png", "jpg", "jpeg"]
            };


function organizeFn(dirPath)
{// we need a directory path as parameter
    if(dirPath==undefined)
    {
        console.log('Please enter a valid input') ;
        return ;
    } // check whether directory path is passed or not and if not simply return.

    let doesExist = fs.existsSync(dirPath) ;
    // this doesExist will tell the Target Folder exists or not.

    if(doesExist==true)
    {
        destPath = path.join(dirPath, 'Organized_Files') ; // C:\Users\Ayush\Desktop\DEV\19_jan\TestFolder - we are ready to create folder .
         // we created a path for organized_Files Folder

         // check whether in the given destPath does a folder exist with same name and if does not make a folder
        if(fs.existsSync(destPath)==false)
        {
            fs.mkdirSync(destPath) ;
        }
        else
        {
            console.log('Folder Already Exists') ;
        }

    }
    else
    {
        console.log('Please enter a valid input') ;
        return ;
    } 

    organizeHelper(dirPath, destPath) ;
}

function organizeHelper(src, dest)
{
    let childNames = fs.readdirSync(src) ;  // Gives an Array of all the files and folders.
    // console.log(childNames) ;

    for(let i=0 ; i<childNames.length ; i++)
    {
        let childAddress = path.join(src, childNames[i]) ;
        // console.log(childAddress) ;

        let isFile = fs.lstatSync(childAddress).isFile() ;  // Checking if 'childAddres' is a file or folder.
        if(isFile == true)
        {
            let fileCategory = getCategory(childNames[i]) ;
            console.log(childNames[i] + " -----  belongs to ------" + fileCategory) ;
            
            sendFiles(childAddress, dest, fileCategory) ; // Sending files from source folder to destination folder.
        }
        
    }
}


function getCategory(fileName)
{
    let ext = path.extname(fileName).slice(1) ;  // We extracted te 'extention names' of the target files.

    // console.log(ext) ; 

    for(let keys in types)  
    {
     // We took out all the category type array here.  
        let cType = types[keys] ; 
        // console.log(cType) ;

        for(let i=0 ; i<cType.length ; i++)
        {
            if(ext == cType[i])
            {
                return keys ;
            }
        }    
    }
    return 'other' ;
}

function sendFiles(srcFilePath, desFilePath, fileCategory)
{// We'll create path of each category type encountered to create folder of their names .

    let catPath = path.join(desFilePath, fileCategory) ;
    // D:\Work\DEV\19_jan\TestFolder\Organized_Files\media

    if(fs.existsSync(catPath) == false)
    {
        fs.mkdirSync(catPath) ;
    }

    let fileName = path.basename(srcFilePath) ;
    // We took the basename(Filename with extention) of all the files.  

    let finalDestPath = path.join(catPath, fileName) ;

    fs.copyFileSync(srcFilePath, finalDestPath) ;
    fs.unlinkSync(srcFilePath) ;
    console.log(fileName + " Organized") ;
}


module.exports = {
    organizeFnKey : organizeFn
}