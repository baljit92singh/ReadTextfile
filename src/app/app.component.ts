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
        this.findWords(data);

      });
  }
  findWords(str: any) {
    var sortedArr = str.split(/\W+/);
    var count = 1;
    const res: Array<any> = [];
    for (var i = 0; i < sortedArr.length; i = i + count) {
      count = 1;
      for (var j = i + 1; j < sortedArr.length; j++) {
        if (sortedArr[i].toLowerCase() === sortedArr[j].toLowerCase()) {
          count++;
        }
      }
      let item = {
        name: sortedArr[i],
        count: count
      }
      res.push(item)
    } 
    // this.textData.sort((a, b) => a.count > b.count ? -1 : 1)
    this.textData = [...new Set(res)]
    this.endTime = this.endTimeCal((performance.now()));
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
