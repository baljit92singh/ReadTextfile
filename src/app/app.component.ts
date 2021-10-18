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
        // this.textData = []
        this.findWords(data);
      });
  }
  findWords(str: any) {
    // var convet = str.split(/\W+/);
    // var convet = str.split(" ");
    var sortedArr = str.split(" ")
    // console.log(sortedArr)
    // var sortedArr = convet.map((v: any) => v.toLowerCase())
    var count = 1;
    const res: Array<any> = [];
    for (var i = 0; i < sortedArr.length; i = i + count) {
      count = 1;
      for (var j = i + 1; j < sortedArr.length; j++) {
        if (sortedArr[i] == sortedArr[j]) {
          count++;
        }
      }
      if (sortedArr[i].length > 6) {
        let item = {
          name: sortedArr[i],
          count: count
        }
        res.push(item)
        var sortData = res.sort((a, b) => a.count > b.count ? -1 : 1);
        // this.textData = sortData
        this.textData = sortData.filter((obj, pos, arr) => {
          return arr.map(mapObj => mapObj["name"]).indexOf(obj["name"]) === pos;
        })
      }
    }
    // console.log(res)

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
