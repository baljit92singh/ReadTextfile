import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = '“War and Peace” written by Leo Tolstoy';
  // textData: Array<any> = [];
  startTime: any
  endTime: any
  dataSet: Array<any> = [];
  dataSetWithLetter: Array<any> = [];
  constructor() {

  }
  ngOnInit() {
    this.getBootData()
  }

  getBootData() {
    fetch('/assets/WarAndPeace.txt')
      .then(response => response.text())
      .then(data => {
        // Do something with your data
        this.startTime = this.startTimeCal(performance.now()); 
        this.getCount(data);
      });
  }
  
  getCount(data: any) {
    let wordsList = data.split(' ');
    let wordObj: any = {};
    let sixWordObj: any = {};
    let wordListLength: number = wordsList.length;
    for (let i = 0; i < wordListLength; i++) {
      let wordLength = wordsList[i].length
      if (wordLength) {
        let wordCount = wordObj[wordsList[i]];
        let count = wordCount ? wordCount : 0;
        wordObj[wordsList[i]] = count + 1;
      }
      if (wordLength > 6) {
        let wordCount = sixWordObj[wordsList[i]];
        let count = wordCount ? wordCount : 0;
        sixWordObj[wordsList[i]] = count + 1;
      }
    }
     this.dataSet=this.getHighestOccourance(wordObj, 50);
     this.dataSetWithLetter=this.getHighestOccourance(sixWordObj, 50);
    this.endTime = this.endTimeCal(performance.now());
    // console.log(this.dataSet)
    // console.log(this.dataSetWithLetter)
  }

  getHighestOccourance = (obj: any, num: number) => {
    let reqObj: any ;
    const sortedList = Object.entries(obj).sort((a:any, b:any) => b[1] - a[1])
    reqObj=sortedList.slice(0,num)
    return reqObj;
  };
  startTimeCal(millis: any) {
    var minutes = Math.floor(millis / 60000);
    var seconds: any = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
  }
  endTimeCal(millis: any) {
    var minutes = Math.floor(millis / 60000);
    var seconds: any = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds
  }
}
