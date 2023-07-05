using System;
using System.Collections.Generic;


public class Book{

    public string id{get; set;}
    public string title{get; set;}
    public string description{get; set;}
    public string imagePath{get; set;}
    public DateTime createdAt{get; set;}
    public string createdBy{get; set;}
    public Author author{get; set;}
    public Category[] categories{get; set;}

}
