/*
SQLyog - Free MySQL GUI v5.02
Host - 5.5.8 : Database - procurement
*********************************************************************
Server version : 5.5.8
*/


create database if not exists `procurement`;

USE `procurement`;

/*Table structure for table `applytbl` */

DROP TABLE IF EXISTS `applytbl`;

CREATE TABLE `applytbl` (
  `apply_id` int(10) NOT NULL AUTO_INCREMENT,
  `bid_id` int(10) NOT NULL,
  `sup_id` int(10) NOT NULL,
  `aprice` int(10) NOT NULL,
  `avalid` int(1) NOT NULL,
  `adate` varchar(50) NOT NULL,
  PRIMARY KEY (`apply_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

/*Data for the table `applytbl` */

insert into `applytbl` values 
(1,1,2,10000,1,'2020/07/14');

/*Table structure for table `bidtbl` */

DROP TABLE IF EXISTS `bidtbl`;

CREATE TABLE `bidtbl` (
  `bidid` int(10) NOT NULL AUTO_INCREMENT,
  `pid` int(10) NOT NULL,
  `bdate` varchar(50) NOT NULL,
  `bvalid` int(1) NOT NULL,
  PRIMARY KEY (`bidid`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

/*Data for the table `bidtbl` */

insert into `bidtbl` values 
(1,3,'2020/07/14',0);

/*Table structure for table `categorytbl` */

DROP TABLE IF EXISTS `categorytbl`;

CREATE TABLE `categorytbl` (
  `cid` int(10) NOT NULL AUTO_INCREMENT,
  `cname` varchar(50) NOT NULL,
  `description` varchar(100) NOT NULL,
  PRIMARY KEY (`cid`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

/*Data for the table `categorytbl` */

insert into `categorytbl` values 
(5,'Pens','hehehez'),
(6,'Bike','mack');

/*Table structure for table `ordertbl` */

DROP TABLE IF EXISTS `ordertbl`;

CREATE TABLE `ordertbl` (
  `order_id` int(10) NOT NULL AUTO_INCREMENT,
  `sup_id` int(10) NOT NULL,
  `pid` int(10) NOT NULL,
  `volume` int(10) NOT NULL,
  `unit` double(8,2) NOT NULL,
  `price` double(8,2) NOT NULL,
  `odate` varchar(50) NOT NULL,
  `ovalid` int(1) NOT NULL,
  PRIMARY KEY (`order_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

/*Data for the table `ordertbl` */

insert into `ordertbl` values 
(1,2,3,2,160.00,20000.00,'2020/07/14',0);

/*Table structure for table `producttbl` */

DROP TABLE IF EXISTS `producttbl`;

CREATE TABLE `producttbl` (
  `pid` int(10) NOT NULL AUTO_INCREMENT,
  `pname` varchar(50) NOT NULL,
  `pcat` int(10) NOT NULL,
  `pdescription` varchar(100) NOT NULL,
  PRIMARY KEY (`pid`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

/*Data for the table `producttbl` */

insert into `producttbl` values 
(1,'HBW',5,'HAHAHAYS'),
(3,'Castle',5,'heheyz');

/*Table structure for table `psupptbl` */

DROP TABLE IF EXISTS `psupptbl`;

CREATE TABLE `psupptbl` (
  `psupid` int(10) NOT NULL AUTO_INCREMENT,
  `sid` int(10) NOT NULL,
  `pid` int(10) NOT NULL,
  `pprice` double(10,2) NOT NULL,
  `tdate` varchar(50) NOT NULL,
  `valid` int(1) NOT NULL,
  PRIMARY KEY (`psupid`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

/*Data for the table `psupptbl` */

insert into `psupptbl` values 
(1,2,3,10000.00,'2020/07/14',1);

/*Table structure for table `suppliertbl` */

DROP TABLE IF EXISTS `suppliertbl`;

CREATE TABLE `suppliertbl` (
  `sid` int(10) NOT NULL AUTO_INCREMENT,
  `sname` varchar(50) NOT NULL,
  `scompany` varchar(50) NOT NULL,
  `saddress` varchar(150) NOT NULL,
  `semail` varchar(50) NOT NULL,
  `spass` varchar(50) NOT NULL,
  `svalid` int(1) NOT NULL,
  `svalidate` varchar(50) NOT NULL,
  `sregister` varchar(50) NOT NULL,
  `scontact` varchar(50) NOT NULL,
  `sposition` varchar(50) NOT NULL,
  `stype` varchar(50) NOT NULL,
  PRIMARY KEY (`sid`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

/*Data for the table `suppliertbl` */

insert into `suppliertbl` values 
(2,'Mack Jaygee Delos Santos','Apple','Street 24 Anderson Street City Scarborough State Full Queensland','dmackjaygee0321@gmail.com','mackpogi',1,'2020/06/30','2020/07/07','09090909','Clerk','Manufacturer'),
(3,'Marc Jericho Delos Santos','Itlogan','Bulacan','mack@qwe.com','qweqwe',1,'2020/06/30','2020/07/08','123817231','CEO','Dealer'),
(4,'natnat','apple','bulacan','natnat@pogi.com','poginatnat',1,'2020/06/30','2020/07/08','123456','janitor','manufacturer');

/*Table structure for table `unittbl` */

DROP TABLE IF EXISTS `unittbl`;

CREATE TABLE `unittbl` (
  `pid` int(10) NOT NULL AUTO_INCREMENT,
  `b_p` int(10) NOT NULL,
  `quantity` int(10) NOT NULL,
  `bundles` varchar(50) NOT NULL,
  `unitm` varchar(50) NOT NULL,
  `movement` tinyint(1) NOT NULL,
  PRIMARY KEY (`pid`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

/*Data for the table `unittbl` */

insert into `unittbl` values 
(1,50,138,'Box','Pcs',0),
(3,80,160,'Box','Pcs',1);
