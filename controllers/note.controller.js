import Note from '../models/note.js';

export const createNote = async(req,res) => {
    try {
        const {title,content,author} = req.body;

        if(!title || !content ) return res.status(400).json({success:false,message:'All Fields are Required'});

        const newNote = await Note.create({
            title , content , author
        });

        return res.status(201).json({success:true,message:'Note Created Successfully',data:newNote});
        
    } catch (error) {
        console.log('Error from create route ',error);
        return res.status(500).json({success:false,message:'Internal Server Error'});
    }
};

export const getNotes = async(req,res) => {
    try {
        const notes = await Note.find().sort({createdAt:-1});
        return res.status(200).json({success:true,message:'Notes Fetched Successfully',data:notes});
        
    } catch (error) {
        console.log('Error from create notes route ',error);
        return res.status(500).json({success:false,message:'Internal Server Error'});
    }
};

export const getNotesById = async(req,res) => {
    try {
        const id = req.params.id ;

        const authorBlogs = await Note.find({author : id}).sort({createdAt:-1});

        return res.status(200).json({success:true,message:`Author ${id} blogs are fetched !`,data:authorBlogs});
        
    } catch (error) {
        console.log('Error from get notes by id route ',error);
        return res.status(500).json({success:false,message:'Internal Server Error'});
    }
};

export const updateNote = async(req,res) => {
    try {
        const id = req.params.id ;
        const {title,content} = req.body;

        if(!title || !content) return res.status(400).json({success:false,message:'All Fields are required'});

        const updatedNote = await Note.findByIdAndUpdate(id , {title , content} ,{new:true});

        if(!updateNote) return res.status(404).json({success:false,message:`No Blog found with the id ${id}`});

        return res.status(200).json({success:true,message:'Note Updated Successfully',data:updatedNote});
        
    } catch (error) {
        console.log('Error from update notes route ',error);
        return res.status(500).json({success:false,message:'Internal Server Error'});
    }
};

export const deleteNote = async(req,res) => {
    try {
        const id = req.params.id ;

        const deletedNote = await Note.findByIdAndDelete(id);

        if(!deletedNote) return res.status(404).json({success:false,message:'No Note Found'});

        return res.status(200).json({success:true,message:'Note deleted successfully',data:deletedNote});
        
    } catch (error) {
        console.log('Error from delete notes route ',error);
        return res.status(500).json({success:false,message:'Internal Server Error'});
    }
};