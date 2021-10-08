import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = '“War and Peace” written by Leo Tolstoy';
  textData: Array<any> = [];
  startTime: any
  endTime: any
  totalTime: any
  constructor() {

  }
  ngOnInit() {
    this.getBootData()
  }

  getBootData() {
    fetch('/assets/text.txt')
      .then(response => response.text())
      .then(data => {
        // Do something with your data
        this.startTime = this.startTimeCal(performance.now());
        this.findDuplicateWords(data);

      });
  }
  findDuplicateWords(str: any) {
    const strArr = str.split(" ");
    const res: Array<any> = [];
    for (let i = 0; i < strArr.length; i++) {
      if (strArr[i].length > 6)
        if (strArr.indexOf(strArr[i]) !== strArr.lastIndexOf(strArr[i])) {
          if (!res.includes(strArr[i])) {
            res.push(strArr[i]);
          };
        };
    };
    this.textData = res.sort((a, b) => a > b ? -1 : 1)
    this.endTime = this.endTimeCal(performance.now());
    // this.totalTime = this.endTime - this.startTime// time took to run in milliseconds
  };

  startTimeCal(millis: any) {
    var minutes = Math.floor(millis / 60000);
    var seconds: any = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
  }
  endTimeCal(millis: any) {
    var minutes = Math.floor(millis / 60000);
    var seconds: any = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
  } 
}
