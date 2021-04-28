const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const app = express();
const hbs = require('hbs');

// const {getHomePage} = require('./routes/index');
// const {addPlayerPage, addPlayer, deletePlayer, editPlayer, editPlayerPage} = require('./routes/player');
const port = 5000;

// create connection to database
// the mysql.createConnection function takes in a configuration object which contains host, user, password and the database name.
const db = mysql.createConnection ({
    host: 'localhost',
    user: 'root',
    password: 'sa',
    database: 'procurement'
});

// connect to database
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});
global.db = db;

// configure middleware
app.set('port', process.env.port || port); // set express to use this port
app.set('views', __dirname + '/'); // set express to look in this folder to render our view
app.set('view engine', 'hbs'); // configure template engine
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // parse form data client
app.use(express.static(path.join(__dirname, '/'))); // configure express to use public folder
app.use(fileUpload()); // configure fileupload
//app.use('/assets',express.static(__dirname + '/'));

// routes for the app
/*
app.get('/', getHomePage);
app.get('/add', addPlayerPage);
app.get('/edit/:id', editPlayerPage);
app.get('/delete/:id', deletePlayer);
app.post('/add', addPlayer);
app.post('/edit/:id', editPlayer);
*/

// set the app to listen on the port
app.listen(port,'0.0.0.0', () => {
    console.log(`Server running on port: ${port}`);
});


app.get('/category',(req, res) => {
    console.log("hehehz");
    
    sql = "select * from categorytbl";

    db.query(sql, function (err, result, fields) {
        if (err) throw err;
        res.render('categorym.hbs',{
                result: result
                });
                console.log("hayahay");
            });
});
app.post('/addcategory',(req, res) => {
    console.log("hehehz");
    
    sql = "Insert into categorytbl values(null, '"+req.body.name+"','"+req.body.category+"')";

    let query = db.query(sql,(err, results) => {
        if(err) throw err;
        console.log("Success");
        res.redirect('/category');
     
    });
});

app.get('/deletecategory',(req, res) => {
    
    let id = req.param('para1');
    console.log("hehehez");
    sql = "delete from categorytbl where cid = "+id+"";

    let query = db.query(sql,(err, results) => {
        if(err) throw err;
        console.log("Success");
        res.redirect('/category');
     
    });
});


app.post('/updatecategory',(req, res) => {
    
    let id = req.param('para1');
    console.log("hehehez");
    let cat = req.body.category;
    let des = req.body.desc;
    sql = "update categorytbl set cname = '"+cat+"', description = '"+des+"' where cid = "+id+"";

    let query = db.query(sql,(err, results) => {
        if(err) throw err;
        
        console.log("Success");
        res.redirect('/category');
     
    });
});


app.get('/product',(req, res) => {
    console.log("hehehz");
    
    sql = "select * from categorytbl";

    db.query(sql, function (err, result, fields) {
        if (err) throw err;

        sql = "select * from producttbl";

    db.query(sql, function (err, results, fields) {
        if (err) throw err;
        sql = "select * from unittbl";

        db.query(sql, function (err, resultss, fields) {
            if (err) throw err;
        res.render('productm.hbs',{
                result: result,
                results: results,
                resultss: resultss,
                });
                console.log("hayahay");
            });
        });
        });
});


app.post('/addproduct',(req, res) => {
    console.log("hehehz");
    
    let name = req.body.name;
    let cat = req.body.cat;
    let cid;
    let desc = req.body.desc;
    let punit = req.body.pvolume;
    let volume = req.body.volume;
    let unit = req.body.unit;
    let tvolume = req.body.ovolume;
    let tunit = req.body.ounit;
    let fvol = "";
    let funit = "";
    if(unit.toString() == "other")
    {
        funit = tunit;
    }
    else
    {
        funit = unit;
    }
    if(volume.toString() == "other")
    {
        fvol = tvolume;
    }
    else
    {
          fvol = volume;
    }
    sql = "select * from categorytbl";

    let query = db.query(sql,(err, result) => {
        if(err) throw err;
        Object.keys(result).forEach(function(key) {
            var row = result[key];
            if(cat.toString() == row.cname.toString())
            {
                cid = row.cid.toString();
            }
        });

        
        sql = "Insert into producttbl values(null, '"+name+"',"+cid+",'"+desc+"')";
        db.query(sql, function (err, result, fields) {
            if (err) throw err;

            sql = "Insert into unittbl values(null,"+punit+",0,'"+fvol+"','"+funit+"')";
            db.query(sql, function (err, result, fields) {
                if (err) throw err;
                    res.redirect('/product');
                    console.log("Insert");
                    
                });
                });
    });
});


app.get('/deleteproduct',(req, res) => {
    
    let id = req.param('para1');
    console.log("hehehez");
    sql = "delete from producttbl where pid = "+id+"";

    let query = db.query(sql,(err, results) => {
        if(err) throw err;
        sql = "delete from unittbl where pid = "+id+"";

    let query = db.query(sql,(err, results) => {
        if(err) throw err;
        console.log("Success");
        res.redirect('/product');
     
    });
    });
});


app.post('/updateproduct',(req, res) => {
    let pid = req.param('para1');
    let name = req.body.name;
    let cat = req.body.cat;
    let cid;
    let desc = req.body.desc; 
    let punit = req.body.pvolume;
    let volume = req.body.volume;
    let unit = req.body.unit;
    let tvolume = req.body.ovolume;
    let tunit = req.body.ounit;
    let fvol = "";
    let funit = "";
    if(unit.toString() == "other")
    {
        funit = tunit;
    }
    else
    {
        funit = unit;
    }
    if(volume.toString() == "other")
    {
        fvol = tvolume;
    }
    else
    {
          fvol = volume;
    }

    sql = "select * from categorytbl";

    let query = db.query(sql,(err, result) => {
        if(err) throw err;
        Object.keys(result).forEach(function(key) {
            var row = result[key];
            if(cat.toString() == row.cname.toString())
            {
                cid = row.cid.toString();
            }
        });
        console.log(name+" "+cat+" "+cid+" "+desc+" "+pid);
        
        sql = "update producttbl set pname = '"+name+"', pcat = "+cid+", pdescription = '"+desc+"' where pid = "+pid;
        db.query(sql, function (err, result, fields) {
            if (err) throw err;

            sql = "update unittbl set b_p = "+punit+",bundles = '"+fvol+"', unitm = '"+funit+"' where pid = "+pid;
            db.query(sql, function (err, result, fields) {
                if (err) throw err;
                    res.redirect('/product');
                    console.log("Insert");
                });
                });
    });
});



app.get('/inventory',(req, res) => { 
    
    
    console.log("hehehz");
    
    sql = "select * from categorytbl";

    db.query(sql, function (err, result, fields) {
        if (err) throw err;

        sql = "select * from producttbl";

    db.query(sql, function (err, results, fields) {
        if (err) throw err;
        sql = "select * from unittbl";

        db.query(sql, function (err, resultss, fields) {
            if (err) throw err;
        res.render('inventory.hbs',{
                result: result,
                results: results,
                resultss: resultss,
                });
                console.log("hayahay");
            });
        });
        });
});


app.post('/updateinventory',(req, res) => { 
    let id = req.param('para1');
    let quantity = req.body.tunit;
    let bools = req.body.mcheck;
    console.log("hehehz");
    
    sql = "update unittbl set quantity = "+quantity+",movement = "+bools+" where pid = "+id;

    db.query(sql, function (err, result, fields) {
        if (err) throw err;
        res.redirect("/inventory");

    });
});


app.post('/searchinventory',(req, res) => {
    console.log("hehehz");
    let search = req.body.search;
    sql = "select * from categorytbl";

    db.query(sql, function (err, result, fields) {
        if (err) throw err;

        sql = "select * from producttbl where pname like '%"+search+"%'";

    db.query(sql, function (err, results, fields) {
        if (err) throw err;
        sql = "select * from unittbl";

        db.query(sql, function (err, resultss, fields) {
            if (err) throw err;
        res.render('inventory.hbs',{
                result: result,
                results: results,
                resultss: resultss,
                });
                console.log("hayahay");
            });
        });
        });
});


app.post('/searchinventory1',(req, res) => {
    console.log("hehehz");
    let search = req.body.search;
    sql = "select * from categorytbl";

    db.query(sql, function (err, result, fields) {
        if (err) throw err;

        sql = "select a.pid as pid,a.pname as pname,a.pcat as pcat,a.pdescription as pdescription, b.cname from producttbl as a, categorytbl as b where a.pcat = b.cid and b.cname like '%"+search+"%'";

    db.query(sql, function (err, results, fields) {
        if (err) throw err;
        sql = "select * from unittbl";

        db.query(sql, function (err, resultss, fields) {
            if (err) throw err;
        res.render('inventory.hbs',{
                result: result,
                results: results,
                resultss: resultss,
                });
                console.log("hayahay");
            });
        });
        });
});


app.get('/vproduct',(req, res) => {
    console.log("hehehz");
    
    sql = "select * from categorytbl";

    db.query(sql, function (err, result, fields) {
        if (err) throw err;

        sql = "select * from producttbl";

    db.query(sql, function (err, results, fields) {
        if (err) throw err;
        sql = "select * from unittbl";

        db.query(sql, function (err, resultss, fields) {
            if (err) throw err;
        res.render('minventory.hbs',{
                result: result,
                results: results,
                resultss: resultss,
                });
                console.log("hayahay");
            });
        });
        });
});


app.get('/',(req, res) => { 
    
    if (typeof localStorage === "undefined" || localStorage === null)
    {
        
        var LocalStorage = require('node-localstorage').LocalStorage;
        localStorage = new LocalStorage('./scratch');
    }
    sql = "select * from suppliertbl where svalid = 1";

    db.query(sql, function (err, result, fields) {
            if (err) throw err;

            res.render('login.hbs',
            {
                result: result
            });
    });
});


app.post('/addsupplier',(req, res) => {
    let name = req.body.name;
    let company = req.body.company;
    let address = req.body.address;
    let email = req.body.email;
    let pass = req.body.pass;
    let type = req.body.type;
    let position = req.body.position;
    let contact = req.body.tel;
    let valid = 0;
    var utc = new Date().toJSON().slice(0,10).replace(/-/g,'/');
    let sched = utc;
    console.log("hehehez");
    sql = "insert into suppliertbl values(null,'"+name+"','"+company+"','"+address+"','"+email+"','"+pass+"',"+valid+",'"+sched+"','OnGoing','"+contact+"','"+position+"','"+type+"')";

    let query = db.query(sql,(err, results) => {
        if(err) throw err;
        console.log("add Success");
        res.redirect('/');
     
    });
});




app.get('/home',(req, res) => { 
    
    res.render('index.hbs');
});



app.get('/invalid',(req, res) => { 
    sql = "Select * from suppliertbl where svalid = 0";
    let query = db.query(sql,(err, result) => {
        if(err) throw err;
        
         res.render('InvalidSupplier.hbs',
         {
            result: result
         });
});

});


app.get('/denysupp',(req, res) => { 
    sql = "Select * from suppliertbl where svalid = 2";
    let query = db.query(sql,(err, result) => {
        if(err) throw err;
        
         res.render('DenySupplier.hbs',
         {
            result: result
         });
});

});

app.get('/approvesupp',(req, res) => { 
    sql = "Select * from suppliertbl where svalid = 1";
    let query = db.query(sql,(err, result) => {
        if(err) throw err;
        
         res.render('ApproveSupplier.hbs',
         {
            result: result
         });
});

});


app.post('/searchapprove',(req, res) => { 
    let search = req.body.search;
    let category = req.body.category;
    let sql = "";
    if(category.toString() == "Contact Person")
    {
        sql = "Select * from suppliertbl where svalid = 1 and sname like '%"+search+"%'";
    }
    else if(category.toString() == "Company")
    {
        sql = "Select * from suppliertbl where svalid = 1 and scompany like '%"+search+"%'";
    }
    else
    {
        sql = "Select * from suppliertbl where svalid = 1 and scompany like '%"+search+"%' || svalid = 1 and sname like '%"+search+"%'";
    }
    let query = db.query(sql,(err, result) => {
        if(err) throw err;
        
         res.render('ApproveSupplier.hbs',
         {
            result: result
         });
});

});


app.post('/searchdeny',(req, res) => { 
    let search = req.body.search;
    let category = req.body.category;
    let sql = "";
    if(category.toString() == "Contact Person")
    {
        sql = "Select * from suppliertbl where svalid = 2 and sname like '%"+search+"%'";
    }
    else if(category.toString() == "Company")
    {
        sql = "Select * from suppliertbl where svalid = 2 and scompany like '%"+search+"%'";
    }
    else
    {
        sql = "Select * from suppliertbl where svalid = 2 and scompany like '%"+search+"%' || svalid = 2 and sname like '%"+search+"%'";
    }
    let query = db.query(sql,(err, result) => {
        if(err) throw err;
        
         res.render('DenySupplier.hbs',
         {
            result: result
         });
});

});


app.post('/searchinvalid',(req, res) => { 
    let search = req.body.search;
    let category = req.body.category;
    let sql = "";
    if(category.toString() == "Contact Person")
    {
        sql = "Select * from suppliertbl where svalid = 0 and sname like '%"+search+"%'";
    }
    else if(category.toString() == "Company")
    {
        sql = "Select * from suppliertbl where svalid = 0 and scompany like '%"+search+"%'";
    }
    else
    {
        sql = "Select * from suppliertbl where svalid = 0 and scompany like '%"+search+"%' || svalid = 0 and sname like '%"+search+"%'";
    }
    let query = db.query(sql,(err, result) => {
        if(err) throw err;
        
         res.render('InvalidSupplier.hbs',
         {
            result: result
         });
});

});


app.get('/aapprove',(req, res) => { 
    let param = req.param("para1");
    let param1 = req.param("para2");
    var utc = new Date().toJSON().slice(0,10).replace(/-/g,'/');
    console.log(param);
    console.log(param1);
    sql = "update suppliertbl set svalid = "+param1+", sregister = '"+utc+"' where sid = "+param;
    let query = db.query(sql,(err, result) => {
        if(err) throw err;
        
        res.redirect("/approvesupp");
        
});
});


app.get('/dapprove',(req, res) => { 
    let param = req.param("para1");
    let param1 = req.param("para2");
    var utc = new Date().toJSON().slice(0,10).replace(/-/g,'/');
    console.log(param);
    console.log(param1);
    sql = "update suppliertbl set svalid = "+param1+", sregister = '"+utc+"' where sid = "+param;
    let query = db.query(sql,(err, result) => {
        if(err) throw err;
        
        res.redirect("/denysupp");
});


});

app.get('/approve',(req, res) => { 
    let param = req.param("para1");
    let param1 = req.param("para2");
    var utc = new Date().toJSON().slice(0,10).replace(/-/g,'/');
    console.log(param);
    console.log(param1);
    sql = "update suppliertbl set svalid = "+param1+", sregister = '"+utc+"' where sid = "+param;
    let query = db.query(sql,(err, result) => {
        if(err) throw err;
        
        res.redirect("/invalid");
});


});


app.get('/viewsupplier',(req, res) => { 
    let id = req.param("para");
    console.log(id);
    let sql = "select  a.pname as pname,a.pid as pid, (select cname from categorytbl where cid = a.pcat) as cname,b.b_p as bp,b.bundles as bundle,b.quantity as quantity,b.unitm as unitm,b.movement as movement  from producttbl as a, unittbl as b "+
    "where a.pid = b.pid and a.pid = " + id;
    let query = db.query(sql,(err, result) => {
        if(err) throw err;
        sql = "select a.*,b.* from suppliertbl as a, psupptbl as b where a.sid  = b.sid and b.valid = 1 and b.pid = "+id;
        let query = db.query(sql,(err, results) => {
            if(err) throw err;

            sql = "select a.*,b.* from suppliertbl as a, psupptbl as b where a.sid  = b.sid and b.valid = 0 and b.pid = "+id;
        let query = db.query(sql,(err, resultss) => {
            if(err) throw err;

            
            sql = "select * from bidtbl where bvalid = 1 and pid = "+id;
        let query = db.query(sql,(err, bid) => {
            if(err) throw err;

            

    res.render("viewpsupp.hbs",{
        result: result,
        results: results,
        bid: bid,
        resultss: resultss
    });
});
});
});

});
});


app.get('/active',(req, res) => { 
    let param = req.param("para1");
    let param1 = req.param("para2");
    let param2 = req.param("para3");
    console.log("asd"+param);
    console.log(param1);
    console.log(param2);
    sql = "update psupptbl set valid = "+param1+" where psupid = "+param;
    let query = db.query(sql,(err, result) => {
        if(err) throw err;
        
        res.redirect("/viewsupplier?para="+param2);
});

});

app.post('/createbid',(req, res) => { 
    let param = req.param("para1");
    var utc = new Date().toJSON().slice(0,10).replace(/-/g,'/');
    console.log("hayahay "+param);
    let sql = "Insert into bidtbl values(null,"+param+",'"+utc+"',1)";
    let query = db.query(sql,(err, result) => {
        if(err) throw err;
        
        res.redirect("/viewsupplier?para="+param);
});
});



app.get('/viewbid',(req, res) => { 
    let sql = "select a.bidid, b.pname, (select cname from categorytbl where cid = b.pcat) as cname,a.bdate from bidtbl as a, producttbl as b where a.pid = b.pid and a.bvalid = 1";
    let query = db.query(sql,(err, result) => {
        if(err) throw err;
        
        
    res.render("bidding.hbs",
    {
        result: result
    });
});
});



app.get('/viewapplybid',(req, res) => {  
    let id = req.param("para1"); 
    console.log(id);
    let sql = "select a.bidid, a.pid, b.pname, (select cname from categorytbl where cid  = b.pcat) as cname,(select concat(b_p,' ',unitm) from unittbl where pid = b.pid) as unit,(select bundles from unittbl where pid = b.pid) as volume, a.bdate from bidtbl as a,producttbl as b where a.pid = b.pid and bidid = "+id;
    let query = db.query(sql,(err, result) => {
    if(err) throw err;

    
    sql = "select a.*,b.* from suppliertbl as a,applytbl as b where a.sid = b.sup_id and b.avalid = 0 and b.bid_id = "+id;
    let query = db.query(sql,(err, results) => {
    if(err) throw err;
    res.render("viewapplybid.hbs",
    {
        result: result,
        results: results
    });
    
}); 
}); 
});


app.get('/awardsupp',(req, res) => {  
    let aid = req.param("para1");  
    let count = req.param("para2"); 
    let pid = req.param("para3");  
    let bid = req.param("para4");  
    let sid = req.param("para5"); 
    let price = req.param("para6");
    let array = [];
    for(let x =0;x < count;x++)
    {
        array[x] = req.param("array"+x);
        if(array[x]!=aid)
        {            
        sql = "update applytbl set avalid = 2 where apply_id = "+array[x];
        let query = db.query(sql,(err, results) => {
        if(err) throw err;
         });
        }
        else
        {     
        sql = "update applytbl set avalid = 1 where apply_id = "+array[x];
        let query = db.query(sql,(err, results) => {
        if(err) throw err;
         });
        }
    }
    console.log("bid "+bid);
    sql = "update bidtbl set bvalid = 0 where bidid = "+bid;
    let query11 = db.query(sql,(err, results) => {
        if(err) throw err;
         });

    
    sql = "Select * from psupptbl";
    let query = db.query(sql,(err, result) => {
        if(err) throw err;
        var x = 0;
        var psupid = -1;
        Object.keys(result).forEach(function(key) {
            var row = result[key];
            if(row.sid.toString() == sid &&row.pid.toString() == pid)
            {
                x = 1;
                psupid = parseInt(row.psupid);
            }
        });

    if(x == 0)
    {     
        var utc = new Date().toJSON().slice(0,10).replace(/-/g,'/');
        sql = "insert into psupptbl values(null,"+sid+","+pid+","+price+",'"+utc+"',1)";
        let query1 = db.query(sql,(err, results) => {
        if(err) throw err;
        });
    }
    else
    {
        sql = "update psupptbl set valid = 1, pprice = "+price+" where psupid = "+psupid;
        let query1 = db.query(sql,(err, results) => {
        if(err) throw err;
        });
    }

         
    res.redirect("/viewsupplier?para="+pid);
   
});

});

app.get('/denysupp',(req, res) => {  
    let aid = req.param("para1");
    let bid = req.param("para2");
        sql = "update applytbl set avalid = 2 where apply_id = "+aid;
        let query = db.query(sql,(err, results) => {
            if(err) throw err;
            res.redirect("/viewapplybid?para1="+bid);
         });
});


app.get('/vieworder',(req, res) => {  
    
    let sql = "select a.order_id,b.pname,(select cname from categorytbl where cid = b.pcat) as cname,concat(a.volume,' ',(select bundles from unittbl where pid = b.pid)) as volume,concat(a.unit,' ',(select unitm from unittbl where pid = b.pid)) as unit,(select scompany from suppliertbl where sid = a.sup_id) as company,(select sname from suppliertbl where sid = a.sup_id) as sname,(select scontact from suppliertbl where sid = a.sup_id) as contact,a.volume as mvol,a.unit as munit,a.price,(select pprice from psupptbl where sid = a.sup_id and pid and a.pid) as pprice,(select b_p from unittbl where pid = a.pid) as fpv from ordertbl as a, producttbl as b where a.pid = b.pid and ovalid = 0";
    let query = db.query(sql,(err, result) => {
        if(err) throw err;

        
    res.render("order.hbs",
    {
        result: result
    });
});
});


app.post('/updateorder',(req, res) => {  
    let orderid = req.param("para2");
    let volume = req.body.tvol;
    let unit = req.body.tunit;
    let price = req.param("para1");
    let sql = "update ordertbl set volume = "+volume+", unit = "+unit+", price = "+price+" where order_id = "+orderid;
    let query = db.query(sql,(err, result) => {
        if(err) throw err;

        
    res.redirect("/vieworder");
});
});




app.post('/order',(req, res) => {  
    let supid = req.param("para1");
    let pid = req.param("para2");
    let total = req.param("para3");
    let volume = req.body.tvol;
    let unit = req.body.tunit;
    var utc = new Date().toJSON().slice(0,10).replace(/-/g,'/');
    sql = "insert into ordertbl values(null,"+supid+","+pid+","+volume+","+unit+","+total+",'"+utc+"',0)";
    let query = db.query(sql,(err, result) => {
        if(err) throw err;

        res.redirect("/viewsupplier?para="+pid);
    });
});



 
 
app.post('/updateprice',(req, res) => { 
    let appid = req.param("para1"); 
    let sid = req.param("para2");
    let price = req.body.price;
    console.log("hayup");
    sql = "update psupptbl set pprice = "+price+" where psupid = "+appid;
    let query = db.query(sql,(err, results) => {
         if(err) throw err;
         res.redirect("/sawardproduct?para1="+sid);
       
 });
  
});


app.get('/cancelorder',(req, res) => { 
    let orderid = req.param("para1");
    sql = "update ordertbl set ovalid = -1 where order_id = "+orderid;
    let query = db.query(sql,(err, results) => {
         if(err) throw err;
         res.redirect("/vieworder");
 });
});



app.get('/sdeclineorder',(req, res) => { 
    let orderid = req.param("para1"); 
    let sid = req.param("para2");
    sql = "update ordertbl set ovalid = 2 where order_id = "+orderid;
    let query = db.query(sql,(err, results) => {
         if(err) throw err;
         res.redirect("/svieworder?para1="+sid);
 });
});


app.get('/shome',(req, res) => { 
    
    res.render('sindex.hbs');
});



app.get('/sawardproduct',(req, res) => {  
    let sid = req.param("para1");
    let sql = "select b.psupid,(select pname from producttbl where pid = b.pid) as pname, (select pcat from producttbl where pid = b.pid) as pcat, (select cname from categorytbl where cid = pcat) as cname,(select bundles from unittbl where pid = b.pid) as volume ,(select concat(b_p,' ',unitm) from unittbl where pid = b.pid) as unit,b.pprice from producttbl as a, psupptbl as b where a.pid = b.pid and b.sid = "+sid;
     let query = db.query(sql,(err, result) => {
         if(err) throw err;
         
         res.render("sawardproduct.hbs",
       {
             result: result
       });
 });
 });

 
app.get('/sviewbidhistory',(req, res) => {  
    let sid = req.param('para1');
    let sql = "select a.apply_id,(select pname from producttbl where pid = b.pid) as pname, (select pcat from producttbl where pid = b.pid) as pcat, (select cname from categorytbl where cid = pcat) as cname,(select bundles from unittbl where pid = b.pid) as volume ,(select concat(b_p,' ',unitm) from unittbl where pid = b.pid) as unit,a.aprice from applytbl as a, bidtbl as b where a.bid_id = b.bidid and avalid = 1 and a.sup_id = "+sid;
     let query = db.query(sql,(err, result) => {
         if(err) throw err;
         
     sql = "select a.apply_id,(select pname from producttbl where pid = b.pid) as pname, (select pcat from producttbl where pid = b.pid) as pcat, (select cname from categorytbl where cid = pcat) as cname,(select bundles from unittbl where pid = b.pid) as volume ,(select concat(b_p,' ',unitm) from unittbl where pid = b.pid) as unit,a.aprice from applytbl as a, bidtbl as b where a.bid_id = b.bidid and avalid = 2 and a.sup_id = "+sid;
     let query = db.query(sql,(err, results) => {
         if(err) throw err;
       res.render("sviewbidhistory.hbs",
       {
             result: result,
             results: results
       });
 });
 });
 });

 
app.get('/svieworder',(req, res) => {  
    let sid = req.param('para1');
    
    sql = "select a.order_id,b.pname,(select cname from categorytbl where cid = b.pcat) as cname,concat(a.volume,' ',(select bundles from unittbl where pid = b.pid)) as volume,concat(a.unit,' ',(select unitm from unittbl where pid = b.pid)) as unit,(select scompany from suppliertbl where sid = a.sup_id) as company,(select sname from suppliertbl where sid = a.sup_id) as sname,(select scontact from suppliertbl where sid = a.sup_id) as contact,a.price from ordertbl as a, producttbl as b where a.pid = b.pid and ovalid = 0 and sup_id = "+sid;
    let query = db.query(sql,(err, result) => {
        if(err) throw err;
    res.render("sorder.hbs",
    {
        result: result
    });
});
});


app.get('/scancelbid',(req, res) => { 
    let sid = req.param('para2');
    let param = req.param("para1"); 
    var utc = new Date().toJSON().slice(0,10).replace(/-/g,'/');
    let sql = "update applytbl set avalid = -1 where apply_id = "+param;
    let query = db.query(sql,(err, result) => {
        if(err) throw err;
        res.redirect("sviewbid?para1="+sid);
    });
});


app.get('/sviewbid',(req, res) => { 
    let sid = req.param('para1');
    let sql = "select a.bidid, b.pname, (select cname from categorytbl where cid = b.pcat) as cname,(select concat(b_p,' ',unitm) from unittbl where pid = b.pid) as unit,(select bundles from unittbl where pid = b.pid) as volume,a.bdate from bidtbl as a, producttbl as b where a.pid = b.pid and a.bvalid = 1";
    let query = db.query(sql,(err, result) => {
        if(err) throw err;
        
    sql = "select * from applytbl where avalid = 0  and sup_id = "+sid;
    let query = db.query(sql,(err, results) => {
        if(err) throw err;
        
    res.render("sbidding.hbs",
    {
        result: result,
        results: results
    });
    });
});
});


app.post('/sapplybid',(req, res) => { 
    
    let sid = req.param('para2');
    let param = req.param("para1"); 
    let price = req.body.price; 
    var utc = new Date().toJSON().slice(0,10).replace(/-/g,'/');
    let sql = "insert into applytbl values(null,"+param+","+sid+","+price+",0,'"+utc+"')";
    let query = db.query(sql,(err, result) => {
        if(err) throw err;
        res.redirect("sviewbid?para1="+sid);
    });
});


app.get('/stopbid',(req, res) => { 
    let param = req.param("para1"); 
    let param1 = req.param("para2");
    let sql = "update bidtbl set bvalid = 0 where bidid = "+param1;
    let query = db.query(sql,(err, result) => {
        if(err) throw err;
        
        res.redirect("/viewsupplier?para="+param);
});
});


app.post('/login',(req, res) => {
    let email = req.body.email;
    let pass = req.body.pass;
    sql = "Select * from suppliertbl where svalid = 1";
    let query = db.query(sql,(err, result) => {
        if(err) throw err;
        let x = 0;
        Object.keys(result).forEach(function(key) {
            var row = result[key];
            if(email.toString() == row.semail.toString()&&pass.toString() == row.spass.toString())
            {
                console.log(localStorage.getItem("hey"));
                res.render("sindex.hbs");
                //sid = row.sid;

                localStorage.setItem('id', row.sid);
                console.log(localStorage.getItem('id'));
                x = 1;
            }
        });
        if(email.toString() == "admin@admin" && pass.toString() == "pass")
        {
            res.render("index.hbs");
        }
        else if(x == 0)
        {
            res.render("login.hbs");
        }
});
});

