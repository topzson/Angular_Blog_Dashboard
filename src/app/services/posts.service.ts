import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private storage: AngularFireStorage,
    private afs: AngularFirestore,
    private toastr: ToastrService) { }

  uploadImage(selectedImage: any,postData :any){
    const filePath = `postIMG/${Date.now()}`;
    console.log(filePath);

    this.storage.upload(filePath, selectedImage).then(()=> {
      console.log('post image updateed successfully')
      this.storage.ref(filePath).getDownloadURL().subscribe(URL =>{
        postData.postImgPath = URL;
        console.log(postData);

        this.afs.collection('posts').add(postData).then(docRef =>{
          this.toastr.success('Data Insert Successfully');
        })

      })

    })
  }

  saveData(){
    
  }
}
