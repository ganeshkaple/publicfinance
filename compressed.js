var express = require("express"), app = express(), mysql = require("mysql"),
    bodyParser = require("body-parser"), sizeof = require("object-sizeof"),
    connection = mysql.createConnection({
        host: "fresh.cyelmj7smxyj.us-east-1.rds.amazonaws.com",
        user: "fresh",
        password: "freshfresh",
        database: "fresh",
        port: "3306",
        debug: !1,
        multipleStatements: !0
    });
connection.connect(function (b) {
    if (b) {
        throw b;
    }
    console.log("You are now connected with mysql database...");
});
var engines = require("consolidate");
app.set("CoolAdmin-master", __dirname + "/CoolAdmin-master");
app.set("view engine", "html");
app.use(express["static"]("CoolAdmin-master"));
app.use(bodyParser.urlencoded({extended: !0}));
app.use(bodyParser.json());
app.get("/", function (b, c) {
    c.sendFile(__dirname + "/CoolAdmin-master/index.html", {user: b.user});
});
app.get("/service1", function (b, c) {
    c.sendFile(__dirname + "/CoolAdmin-master/dash.html", {user: b.user});
});
app.get("/main", function (b, c) {
    c.sendFile(__dirname + "/CoolAdmin-master/customer.html", {user: b.user});
});
app.get("/r", function (b, c) {
    c.sendFile(__dirname + "/CoolAdmin-master/report.html", {user: b.user});
});
app.get("/expenses", function (b, c) {
    c.sendFile(__dirname + "/CoolAdmin-master/expenses2.html", {user: b.user});
});
app.get("/loan", function (b, c) {
    c.sendFile(__dirname + "/CoolAdmin-master/input3.html", {user: b.user});
});
app.get("/reg", function (b, c) {
    c.sendFile(__dirname + "/CoolAdmin-master/try1.html", {user: b.user});
});
app.get("/test2", function (b, c) {
    c.sendFile(__dirname + "/CoolAdmin-master/test2.html", {user: b.user});
});
app.get("/service", function (b, c) {
    c.sendFile(__dirname + "/CoolAdmin-master/dash.html", {user: b.user});
});
app.get("/service2", function (b, c) {
    c.sendFile(__dirname + "/CoolAdmin-master/tamount.html", {user: b.user});
});
app.get("/userprofile", function (b, c) {
    c.sendFile(__dirname + "/CoolAdmin-master/userprofile.html", {user: b.user});
});
app.get("/userprofile1", function (b, c) {
    c.sendFile(__dirname + "/CoolAdmin-master/userprofile1.html", {user: b.user});
});
app.get("/random", function (b, c) {
    c.sendFile(__dirname + "/CoolAdmin-master/random.html", {user: b.user});
});
app.get("/mydate", function (b, c) {
    c.sendFile(__dirname + "/CoolAdmin-master/mydate.html", {user: b.user});
});
app.get("/profile1", function (b, c) {
    c.sendFile(__dirname + "/CoolAdmin-master/profile1.html", {user: b.user});
});
app.get("/tracking", function (b, c) {
    c.render(__dirname + "/relax/tracking_results", {user: b.user});
});
app.get("/tracking1", function (b, c) {
    c.render(__dirname + "/relax/track", {user: b.user});
});
app.get("/tracking2", function (b, c) {
    c.render(__dirname + "/relax/track1", {user: b.user});
});
app.post("/api/newregister", function (b, c) {
    var a = b.body.fullname, e = b.body.mobile, d = b.body.idproof, f = b.body.idproofno,
        g = b.body.address;
    console.log(a);
    var h = {error: 1, newuser: ""};
    console.log("POST Request :: /insert: ");
    a && e && d && f && g ? connection.query("INSERT INTO hero SET fullname = ?,  mobile = ?,  idproof = ?, idproofno = ?, address = ?", [a, e, d, f, g], function (b, l, m) {
        b ? (h.newuser = "Error Adding data", console.log(b)) : (h.error = 0, h.newuser = "new user Added Successfully", console.log("Added: " + [a, e, d, f, g]));
        c.json(h);
    }) : (h.newuser = "Please provide all required data (i.e : fullname, mobile, idproof, idproofno, address)", c.json(h));
});
app.get("/api/registeruser", function (b, c) {
    var a = {error: 1, report: ""};
    connection.query("SELECT  * from hero WHERE cid = LAST_INSERT_ID();", function (e, b, f) {
        0 === b.length || e ? 0 === b.length ? (a.error = 2, a.report = "No products Found..", c.json(a)) : (a.report = "error while performing query", c.json(a), console.log("Error while performing Query: " + e)) : (a.error = 0, a.report = b, c.json(a));
    });
});
app.get("/api/registerusers", function (b, c) {
    var a = {error: 1, report: ""};
    connection.query("SELECT  * FROM hero ORDER BY cid DESC LIMIT 1;", function (e, b, f) {
        0 === b.length || e ? 0 === b.length ? (a.error = 2, a.report = "No products Found..", c.json(a)) : (a.report = "error while performing query", c.json(a), console.log("Error while performing Query: " + e)) : (a.error = 0, a.report = b, c.json(a));
    });
});
app.get("/api/loanuser", function (b, c) {
    var a = {error: 1, report: ""};
    connection.query("SELECT  * FROM loan ORDER BY cid DESC LIMIT 1;", function (e, b, f) {
        0 === b.length || e ? 0 === b.length ? (a.error = 2, a.report = "No products Found..", c.json(a)) : (a.report = "error while performing query", c.json(a), console.log("Error while performing Query: " + e)) : (a.error = 0, a.report = b, c.json(a));
    });
});
app.get("/api/installid/:loan_id", function (b, c) {
    var a = {error: 1, product: ""};
    connection.query("SELECT   installements.mydate, installements.installement_id, installements.loan_id, installements.installement_amount  FROM loan JOIN installements  ON   loan.loan_id = installements.loan_id  WHERE loan.loan_id  = ?", [b.params.loan_id], function (b, d, f) {
        0 === d.length || b ? 0 === d.length ? (a.error = 2, a.product = "No products Found..", c.json(a)) : (a.product = "error while performing query", c.json(a), console.log("Error while performing Query: " + b)) : (a.error = 0, a.product = d, c.json(a));
    });
});
app.get("/api/installide/", function (b, c) {
    var a = {error: 1, product: ""};
    connection.query("SELECT   installements.mydate, installements.installement_id, installements.loan_id, installements.installement_amount  FROM loan JOIN installements  ON   loan.loan_id = installements.loan_id  ", [b.params.loan_id], function (b, d, f) {
        0 === d.length || b ? 0 === d.length ? (a.error = 2, a.product = "No products Found..", c.json(a)) : (a.product = "error while performing query", c.json(a), console.log("Error while performing Query: " + b)) : (a.error = 0, a.product = d, c.json(a));
    });
});
app.get("/api/installements/:installement_id", function (b, c) {
    var a = {error: 1, product: ""};
    connection.query("SELECT installement_id, mydate, installement_amount, loan_id FROM  installements WHERE installement_id  = ?", [b.params.installement_id], function (b, d, f) {
        0 === d.length || b ? 0 === d.length ? (a.error = 2, a.product = "No products Found..", c.json(a)) : (a.product = "error while performing query", c.json(a), console.log("Error while performing Query: " + b)) : (a.error = 0, a.product = d, c.json(a));
    });
});
app.get("/api/installementtable/", function (b, c) {
    var a = {error: 1, product: ""};
    connection.query("SELECT * FROM  installements", function (b, d, f) {
        0 === d.length || b ? 0 === d.length ? (a.error = 2, a.product = "No products Found..", c.json(a)) : (a.product = "error while performing query", c.json(a), console.log("Error while performing Query: " + b)) : (a.error = 0, a.product = d, c.json(a));
    });
});
app.get("/api/transactionmodels/", function (b, c) {
    var a = {error: 1, product: ""};
    connection.query("SELECT * FROM  transactionmodels ORDER BY  transaction_id DESC LIMIT 5;", function (b, d, f) {
        0 === d.length || b ? 0 === d.length ? (a.error = 2, a.product = "No products Found..", c.json(a)) : (a.product = "error while performing query", c.json(a), console.log("Error while performing Query: " + b)) : (a.error = 0, a.product = d, c.json(a));
    });
});
app.post("/api/transaction/", function (b, c) {
    var a = {error: 1, product: ""};
    connection.query("SELECT * FROM  transactionmodels  WHERE loan_id = ? ORDER BY  transaction_id DESC", [b.body.loan_id], function (b, d, f) {
        0 === d.length || b ? 0 === d.length ? (a.error = 2, a.product = "No products Found..", c.json(a)) : (a.product = "error while performing query", c.json(a), console.log("Error while performing Query: " + b)) : (a.error = 0, a.product = d, c.json(a));
    });
});
app.post("/api/loansum/", function (b, c) {
    var a = b.body.loan_id, e = {error: 1, product: ""};
    connection.query("SELECT * FROM  transactionmodels  WHERE loan_id = ? ORDER BY  transaction_id DESC; UPDATE loan INNER JOIN transactionmodels ON loan.loan_id = transactionmodels.loan_id  SET loan.receivedamt =( SELECT sum(installement_amount) FROM transactionmodels) WHERE transactionmodels.loan_id = ?", [a, a], function (a, b, g) {
        0 === b.length || a ? 0 === b.length ? (e.error = 2, e.product = "No products Found..", c.json(e)) : (e.product = "error while performing query", c.json(e), console.log("Error while performing Query: " + a)) : (e.error = 0, e.product = b, c.json(e));
    });
});
app.post("/api/updatenew", function (b, c) {
    var a = b.body.installement_id, e = b.body.mydate;
    console.log(e);
    var d = b.body.installement_amount;
    console.log(d);
    var f = b.body.loan_id, g = {error: 1, report: ""};
    connection.query("SELECT * FROM installements WHERE installement_id = ?", [a], function (b, k, l) {
        0 < k.length && (console.log("error3"), k[0].installement_amount == d ? (console.log("error1"), console.log(d), connection.query("DELETE FROM installements WHERE installement_id = ?;INSERT INTO  transactionmodels SET mydate =?, installement_amount = ?, loan_id =?;", [a, e, d, f, a, e, d, f], function (a, b, e) {
            0 === b.length || a ? 0 === b.length ? (g.error = 2, g.report = "No products Found..", c.json(g)) : (g.report = "error while performing query", c.json(g), console.log("Error while performing Query: " + a)) : connection.query("SELECT   installements.mydate, installements.installement_id, installements.loan_id, installements.installement_amount  FROM loan JOIN installements  ON   loan.loan_id = installements.loan_id  WHERE loan.loan_id  = ?; ", [f], function (a, b, e) {
                0 === b.length || a ? 0 === b.length ? (g.error = 2, g.report = "No products Found..", c.json(g)) : (g.report = "error while performing query", c.json(g), console.log("Error while performing Query: " + a)) : (g.error = 0, g.report = b, c.json(g));
            });
        })) : connection.query("UPDATE installements SET mydate = ?, installement_amount = installement_amount - ?, loan_id = ? WHERE installement_id = ?; INSERT INTO  transactionmodels SET mydate =?, installement_amount = ?, loan_id =?; ", [e, d, f, a, e, d, f], function (a, b, e) {
            0 === b.length || a ? 0 === b.length ? (g.error = 2, g.report = "No products Found..", c.json(g)) : (g.report = "error while performing query", c.json(g), console.log("Error while performing Query: " + a)) : connection.query("SELECT   installements.mydate, installements.installement_id, installements.loan_id, installements.installement_amount  FROM loan JOIN installements  ON   loan.loan_id = installements.loan_id  WHERE loan.loan_id  = ?; ", [f], function (a, b, e) {
                0 === b.length || a ? 0 === b.length ? (g.error = 2, g.report = "No products Found..", c.json(g)) : (g.report = "error while performing query", c.json(g), console.log("Error while performing Query: " + a)) : (g.error = 0, g.report = b, c.json(g));
            });
        }));
    });
});
app.post("/api/update", function (b, c) {
    var a = b.body.installement_id, e = b.body.mydate;
    console.log(e);
    var d = b.body.installement_amount;
    console.log(d);
    var f = b.body.loan_id, g = {error: 1, product: ""};
    connection.query("SELECT * FROM installements WHERE installement_id = ?", [a], function (b, k, l) {
        0 < k.length && (console.log("error3"), k[0].installement_amount == d ? (console.log("error1"), console.log(d), connection.query("DELETE FROM installements WHERE installement_id = ? ", [a], function (b, e, d) {
            b ? (g.product = "Error Updating data", console.log(b)) : (g.error = 0, g.product = "deleted Book Successfully", console.log("Updated: " + [a]));
            c.json(g);
        })) : connection.query("UPDATE installements SET mydate = ?, installement_amount = installement_amount - ?, loan_id = ? WHERE installement_id = ?; INSERT INTO  transactionmodels SET mydate =?, installement_amount = ?, loan_id =?; ", [e, d, f, a, e, d, f], function (a, b, e) {
            0 === b.length || a ? 0 === b.length ? (g.error = 2, g.product = "No products Found..", c.json(g)) : (g.product = "error while performing query", c.json(g), console.log("Error while performing Query: " + a)) : connection.query("SELECT   installements.mydate, installements.installement_id, installements.loan_id, installements.installement_amount  FROM loan JOIN installements  ON   loan.loan_id = installements.loan_id  WHERE loan.loan_id  = ?; ", [f], function (a, b, e) {
                0 === b.length || a ? 0 === b.length ? (g.error = 2, g.product = "No products Found..", c.json(g)) : (g.product = "error while performing query", c.json(g), console.log("Error while performing Query: " + a)) : (g.error = 0, g.product = b, c.json(g));
            });
        }));
    });
});
app.post("/api/updatemy", function (b, c) {
    var a = b.body.installement_id, e = b.body.mydate;
    console.log(e);
    var d = b.body.installement_amount;
    console.log(d);
    var f = b.body.loan_id, g = {error: 1, product: ""};
    connection.query("UPDATE installements SET mydate = ?, installement_amount = ?, loan_id = ? WHERE installement_id = ?; INSERT INTO  transactionmodels SET mydate =?, installement_amount = ?, loan_id =?; ", [e, d, f, a, e, d, f], function (a, b, e) {
        0 === b.length || a || connection.query("SELECT * FROM installements ORDER BY installement_id DESC ", function (a, b, e) {
            0 === b.length || a ? 0 === b.length ? (g.error = 2, g.product = "No products Found..", c.json(g)) : (g.product = "error while performing query", c.json(g), console.log("Error while performing Query: " + a)) : (g.error = 0, g.product = b, c.json(g));
        });
    });
});
app.post("/api/delete/:installement_id", function (b, c) {
    var a = b.params.installement_id;
    console.log(a);
    var e = {error: 1, product: ""};
    connection.query("DELETE FROM installements WHERE  installement_id = ?", [a], function (a, b, g) {
        0 === b.length || a ? (e.product = "No product Found..", c.json(e), console.log("Error while performing Query: " + a)) : (e.error = 0, e.product = b, c.json(e));
    });
});
app.get("/api/installementsloan/:installement_id", function (b, c) {
    var a = {error: 1, product: ""};
    connection.query("SELECT   mydate, installement_id,  loan.installement_amount  FROM loan JOIN installements  ON   loan.loan_id = installements.loan_id  WHERE installements.installement_id  = ?", [installement_id], function (b, d, f) {
        0 === d.length || b ? 0 === d.length ? (a.error = 2, a.product = "No products Found..", c.json(a)) : (a.product = "error while performing query", c.json(a), console.log("Error while performing Query: " + b)) : (a.error = 0, a.product = d, c.json(a));
    });
});
app.post("/api/loanusers/", function (b, c) {
    var a = b.body.loan_id, e = b.body.loan_amount, d = b.body.startdate, f = b.body.enddate,
        g = b.body.installementtype, h = b.body.noofinstallement, k = b.body.dayDifference,
        l = b.body.interest, m = b.body.cid;
    console.log(e);
    var n = {error: 1, newuser: ""};
    console.log("POST Request :: /insert: ");
    connection.query("INSERT INTO loan SET loan_id = ?, loan_amount = ?, startdate = ?, enddate = ?,  installementtype = ?, noofinstallement = ?,dayDifference = ?, interest = ?, cid = ?;", [a, e, d, f, g, h, k, l, m], function (b, q, r) {
        b ? (n.newuser = "Error Adding data", console.log(b)) : (n.error = 0, n.newuser = "new user Added Successfully", console.log("Added: " + [a, e, d, f, g, h, k, l, m, a]));
        c.json(n);
    });
});
app.post("/api/loanuserss/", function (b, c) {
    var a = b.body.loan_id, e = b.body.loan_amount, d = b.body.startdate, f = b.body.enddate,
        g = b.body.installementtype, h = b.body.noofinstallement, k = b.body.dayDifference,
        l = b.body.cid;
    console.log(e);
    var m = {error: 1, newuser: ""};
    console.log("POST Request :: /insert: ");
    connection.query("INSERT INTO loan SET loan_id = ?, loan_amount = ?, startdate = ?, enddate = ?,  installementtype = ?, noofinstallement = ?,dayDifference = ?,  cid = ?;", [a, e, d, f, g, h, k, l], function (b, p, q) {
        b ? (m.newuser = "Error Adding data", console.log(b)) : (m.error = 0, m.newuser = "new user Added Successfully", console.log("Added: " + [a, e, d, f, g, h, k, l, a]));
        c.json(m);
    });
});
app.post("/api/insertmydate", function (b, c) {
    var a = b.body.loan_id, e = b.body.installement_amount, d = b.body.mydate, f = sizeof(d);
    console.log("POST Request :: /insert: ");
    for (var g = 0; g < f; g += 1) {
        connection.query("INSERT INTO installements SET loan_id = ?, installement_amount = ?, mydate = ?", [a, e, d[g]], function (a, b) {
            a || console.log("success");
        });
    }
    c.sendStatus(200);
});
app.post("/api/transactionloanid", function (b, c) {
    var a = b.body.loan_id;
    console.log("POST Request :: /insert: ");
    connection.query("INSERT INTO transactionmodels SET loan_id = ?, mydate = ?", [a], function (a, b) {
        a || console.log("success");
        c.sendStatus(200);
    });
});
app.get("/notification", function (b, c) {
    var a = {error: 1, report: ""};
    connection.query("SELECT count(comment_status) as cid FROM hero where comment_status = 0;SELECT * FROM hero ORDER BY cid DESC LIMIT 5;", function (b, d, f) {
        0 === d.length || b ? 0 === d.length ? (a.error = 2, a.report = "No products Found..", c.json(a)) : (a.report = "error while performing query", c.json(a), console.log("Error while performing Query: " + b)) : (a.error = 0, a.report = d, c.json(a));
    });
});
app.get("/updatenote", function (b, c) {
    var a = {error: 1, report: ""};
    connection.query("UPDATE hero SET comment_status = 1 WHERE comment_status = 0", function (b, d, f) {
        0 === d.length || b ? 0 === d.length ? (a.error = 2, a.report = "No products Found..", c.json(a)) : (a.report = "error while performing query", c.json(a), console.log("Error while performing Query: " + b)) : (a.error = 0, a.report = d, c.json(a));
    });
});
app.post("/sort", function (b, c) {
    connection.query("SELECT * FROM loan WHERE  startdate   BETWEEN ? AND ? ", [b.body.fdate, b.body.tdate], function (a, b) {
        if (a) {
            throw a;
        }
        c.end(JSON.stringify(b));
    });
});
app.post("/datesort", function (b, c) {
    var a = b.body.fdate, e = b.body.tdate;
    console.log(a);
    console.log(e);
    var d = {error: 1, report: ""};
    connection.query("SELECT * FROM loan WHERE  startdate   BETWEEN ? AND ? ", [a, e], function (a, b, e) {
        0 === b.length || a ? 0 === b.length ? (d.error = 2, d.report = "No products Found..", c.json(d)) : (d.report = "error while performing query", c.json(d), console.log("Error while performing Query: " + a)) : (d.error = 0, d.report = b, c.json(d));
    });
});
app.post("/lent", function (b, c) {
    var a = {error: 1, report: ""};
    connection.query("SELECT loan_amount, loan.loan_id, hero.cid,  noofinstallement, receivedamt, fullname, loan.startdate,  mobile FROM hero JOIN  loan ON hero.cid = loan.cid  WHERE  loan.startdate   BETWEEN ? AND ? ", [b.body.fdate, b.body.tdate], function (b, d, f) {
        0 === d.length || b ? 0 === d.length ? (a.error = 2, a.report = "No products Found..", c.json(a)) : (a.report = "error while performing query", c.json(a), console.log("Error while performing Query: " + b)) : (a.error = 0, a.report = d, c.json(a));
    });
});
app.post("/earned", function (b, c) {
    var a = {error: 1, report: ""};
    connection.query("SELECT loan_id  FROM loan WHERE  startdate   BETWEEN ? AND ? AND installement_amount IS NOT NULL", [b.body.fdate, b.body.tdate], function (b, d, f) {
        0 === d.length || b ? 0 === d.length ? (a.error = 2, a.report = "No products Found..", c.json(a)) : (a.report = "error while performing query", c.json(a), console.log("Error while performing Query: " + b)) : (a.error = 0, a.report = d, c.json(a));
    });
});
app.post("/receive", function (b, c) {
    var a = {error: 1, report: ""};
    connection.query("SELECT loan_id, receivedamt, startdate  FROM loan WHERE  startdate   BETWEEN ? AND ? ", [b.body.fdate, b.body.tdate], function (b, d, f) {
        0 === d.length || b ? 0 === d.length ? (a.error = 2, a.report = "No products Found..", c.json(a)) : (a.report = "error while performing query", c.json(a), console.log("Error while performing Query: " + b)) : (a.error = 0, a.report = d, c.json(a));
    });
});
app.get("/all", function (b, c) {
    var a = {error: 1, report: ""};
    connection.query("SELECT * FROM loan", function (b, d, f) {
        0 === d.length || b ? 0 === d.length ? (a.error = 2, a.report = "No products Found..", c.json(a)) : (a.report = "error while performing query", c.json(a), console.log("Error while performing Query: " + b)) : (a.error = 0, a.report = d, c.json(a));
    });
});
app.post("/api/report", function (b, c) {
    var a = {error: 1, report: ""};
    connection.query("SELECT * FROM  loan WHERE   startdate   BETWEEN ? AND ?", [b.body.fdate, b.body.tdate], function (b, d, f) {
        0 === d.length || b ? 0 === d.length ? (a.error = 2, a.report = "No products Found..", c.json(a)) : (a.report = "error while performing query", c.json(a), console.log("Error while performing Query: " + b)) : (a.error = 0, a.report = d, c.json(a));
    });
});
app.get("/newuser", function (b, c) {
    var a = {error: 1, report: ""};
    connection.query("SELECT * FROM installements ORDER BY installement_id DESC;", function (b, d, f) {
        0 === d.length || b ? 0 === d.length ? (a.error = 2, a.report = "No products Found..", c.json(a)) : (a.report = "error while performing query", c.json(a), console.log("Error while performing Query: " + b)) : (a.error = 0, a.report = d, c.json(a));
    });
});
app.get("/api/books/", function (b, c) {
    var a = {error: 1, report: ""};
    connection.query("SELECT * FROM hero;", function (b, d, f) {
        0 === d.length || b ? 0 === d.length ? (a.error = 2, a.report = "No products Found..", c.json(a)) : (a.report = "error while performing query", c.json(a), console.log("Error while performing Query: " + b)) : (a.error = 0, a.report = d, c.json(a));
    });
});
app.get("/api/books3/", function (b, c) {
    var a = {error: 1, report: ""};
    connection.query("SELECT  loan_amount, loan.loan_id, hero.cid,  noofinstallement, receivedamt, fullname,  mobile FROM hero JOIN  loan ON hero.cid = loan.cid ", function (b, d, f) {
        0 === d.length || b ? 0 === d.length ? (a.error = 2, a.report = "No products Found..", c.json(a)) : (a.report = "error while performing query", c.json(a), console.log("Error while performing Query: " + b)) : (a.error = 0, a.report = d, c.json(a));
    });
});
app.get("/api/books2/", function (b, c) {
    var a = {error: 1, report: ""};
    connection.query("SELECT * FROM loan;", function (b, d, f) {
        0 === d.length || b ? 0 === d.length ? (a.error = 2, a.report = "No products Found..", c.json(a)) : (a.report = "error while performing query", c.json(a), console.log("Error while performing Query: " + b)) : (a.error = 0, a.report = d, c.json(a));
    });
});
app.get("/api/books1/", function (b, c) {
    var a = {error: 1, report: ""};
    connection.query("SELECT  sum(receivedamt) as RAmount,sum(loan_amount) as LAmount FROM loan;", function (b, d, f) {
        0 === d.length || b ? 0 === d.length ? (a.error = 2, a.report = "No products Found..", c.json(a)) : (a.report = "error while performing query", c.json(a), console.log("Error while performing Query: " + b)) : (a.error = 0, a.report = d, c.json(a));
    });
});
app.get("/api/table1/:cid", function (b, c) {
    var a = b.params.cid;
    console.log(a);
    var e = {error: 1, report: ""};
    console.log("GET request :: /list/" + a);
    connection.query("SELECT hero.cid, loan.loan_id, loan_amount, address, noofinstallement, interest, dayDifference, startdate, receivedamt, fullname, mobile FROM hero JOIN  loan ON hero.cid = loan.cid WHERE hero.cid  = ?", [a], function (a, b, g) {
        0 === b.length || a ? 0 === b.length ? (e.error = 2, e.report = "No products Found..", c.json(e)) : (e.report = "error while performing query", c.json(e), console.log("Error while performing Query: " + a)) : (e.error = 0, e.report = b, c.json(e));
    });
});
app.get("/api/table2/:loan_id", function (b, c) {
    var a = b.params.loan_id;
    console.log(a);
    var e = {error: 1, report: ""};
    console.log("GET request :: /list/" + a);
    connection.query("SELECT hero.cid, loan.loan_id, loan_amount, address, noofinstallement, interest, dayDifference, startdate, receivedamt, fullname, mobile FROM hero JOIN  loan ON hero.cid = loan.cid WHERE loan.loan_id  = ?", [a], function (a, b, g) {
        0 === b.length || a ? 0 === b.length ? (e.error = 2, e.report = "No products Found..", c.json(e)) : (e.report = "error while performing query", c.json(e), console.log("Error while performing Query: " + a)) : (e.error = 0, e.report = b, c.json(e));
    });
});
app.get("/api/tables/:loan_id", function (b, c) {
    var a = b.params.loan_id;
    console.log(a);
    var e = {error: 1, report: ""};
    console.log("GET request :: /list/" + a);
    connection.query("SELECT   installements.mydate, installements.installement_id, loan.loan_id, installements.installement_amount  FROM loan JOIN installements  ON   loan.loan_id = installements.loan_id  WHERE loan.loan_id  = ?", [a], function (a, b, g) {
        0 === b.length || a ? 0 === b.length ? (e.error = 2, e.report = "No products Found..", c.json(e)) : (e.report = "error while performing query", c.json(e), console.log("Error while performing Query: " + a)) : (e.error = 0, e.report = b, c.json(e));
    });
});
app.get("/api/expendituressum", function (b, c) {
    var a = {error: 1, sum: ""};
    connection.query("SELECT sum(Room_Rent) as Room_Rent ,sum(Light_Bill) as Light_Bill,sum(Mobile_Bill) as Mobile_Bill , sum(Payment) as Payment,sum(Petrol) as Petrol,sum(Others) as Others from expenditure ", function (b, d, f) {
        0 === d.length || b ? 0 === d.length ? (a.error = 2, a.sum = "No products Found..", c.json(a), c.redirect("/posts")) : (a.sum = "error while performing query", c.json(a), console.log("Error while performing Query: " + b)) : (a.error = 0, a.sum = d, c.json(a));
    });
});
app.get("/api/loanlisttable", function (b, c) {
    var a = {error: 1, report: ""};
    connection.query("SELECT * from loan", function (b, d, f) {
        0 === d.length || b ? 0 === d.length ? (a.error = 2, a.report = "No products Found..", c.json(a)) : (a.report = "error while performing query", c.json(a), console.log("Error while performing Query: " + b)) : (a.error = 0, a.report = d, c.json(a));
    });
});
app.post("/api/expend", function (b, c) {
    var a = b.body.Payment, e = b.body.expenses, d = b.body.date, f = {error: 1, expenditure: ""};
    console.log("POST Request :: /insert: ");
    a && e && d ? connection.query("INSERT INTO expenditure SET money = ?, expenses = ?,  date = ?", [a, e, d], function (b, h, k) {
        b ? (f.expenditure = "Error Adding data", console.log(b)) : (f.error = 0, f.expenditure = "new user Added Successfully", console.log("Added: " + [a, e, d]));
        c.json(f);
    }) : (f.expenditure = "Please provide all required data (i.e : Payment,  expenses, date)", c.json(f));
});
app.get("/api/roomrent", function (b, c) {
    console.log("GET Request :: /roomrent");
    var a = {error: 1, Room_Rent: ""};
    connection.query("SELECT sum(money) as Room_Rents FROM expenditure WHERE expenses ='Room_Rent' ;SELECT money,date FROM expenditure WHERE expenses ='Room_Rent'", function (b, d, f) {
        0 === d.length || b ? 0 === d.length ? (a.error = 2, a.Room_Rent = "No products Found..", c.json(a)) : (a.Room_Rent = "error while performing query", c.json(a), console.log("Error while performing Query: " + b)) : (a.error = 0, a.Room_Rent = d, c.json(a));
    });
});
app.get("/api/light_bill", function (b, c) {
    console.log("GET Request :: /light_bill");
    var a = {error: 1, light_bill: ""};
    connection.query("SELECT sum(money) as Light_Bills FROM expenditure WHERE expenses ='Light_Bill';SELECT money,date from expenditure WHERE expenses ='Light_Bill'", function (b, d, f) {
        0 === d.length || b ? 0 === d.length ? (a.error = 2, a.light_bill = "No products Found..", c.json(a)) : (a.light_bill = "error while performing query", c.json(a), console.log("Error while performing Query: " + b)) : (a.error = 0, a.light_bill = d, c.json(a));
    });
});
app.get("/api/mobile_bill", function (b, c) {
    console.log("GET Request :: /mobile_bill");
    var a = {error: 1, mobile_bill: ""};
    connection.query("SELECT sum(money) as Mobile_Bills FROM expenditure WHERE expenses ='Mobile_Bill';SELECT money,date from expenditure WHERE expenses ='Mobile_Bill'", function (b, d, f) {
        0 === d.length || b ? 0 === d.length ? (a.error = 2, a.mobile_bill = "No products Found..", c.json(a)) : (a.mobile_bill = "error while performing query", c.json(a), console.log("Error while performing Query: " + b)) : (a.error = 0, a.mobile_bill = d, c.json(a));
    });
});
app.get("/api/payment", function (b, c) {
    console.log("GET Request :: /payment");
    var a = {error: 1, payment: ""};
    connection.query("SELECT sum(money) as Payments FROM expenditure WHERE expenses ='Payment';SELECT money,date from expenditure WHERE expenses ='Payment'", function (b, d, f) {
        0 === d.length || b ? 0 === d.length ? (a.error = 2, a.payment = "No products Found..", c.json(a)) : (a.payment = "error while performing query", c.json(a), console.log("Error while performing Query: " + b)) : (a.error = 0, a.payment = d, c.json(a));
    });
});
app.get("/api/petrol", function (b, c) {
    console.log("GET Request :: /petrol");
    var a = {error: 1, Petrol: ""};
    connection.query("SELECT sum(money) as Petrols FROM expenditure WHERE expenses ='Petrol';SELECT money,date from expenditure WHERE expenses ='Petrol'", function (b, d, f) {
        0 === d.length || b ? 0 === d.length ? (a.error = 2, a.Petrol = "No products Found..", c.json(a)) : (a.Petrol = "error while performing query", c.json(a), console.log("Error while performing Query: " + b)) : (a.error = 0, a.Petrol = d, c.json(a));
    });
});
app.get("/api/others", function (b, c) {
    console.log("GET Request :: /others");
    var a = {error: 1, Others: ""};
    connection.query("SELECT sum(money) as Otherss FROM expenditure WHERE expenses ='Others';SELECT money,date from expenditure WHERE expenses ='Others'", function (b, d, f) {
        0 === d.length || b ? 0 === d.length ? (a.error = 2, a.Others = "No products Found..", c.json(a)) : (a.Others = "error while performing query", c.json(a), console.log("Error while performing Query: " + b)) : (a.error = 0, a.Others = d, c.json(a));
    });
});
app.get("/mobile/lastinsertnewuser", function (b, c) {
    connection.query("SELECT  * from hero WHERE cid = LAST_INSERT_ID();", function (a, b, d) {
        if (a) {
            throw a;
        }
        c.end(JSON.stringify(b));
    });
});
app.post("/mobile/newloanusers/", function (b, c) {
    var a = b.body.loan_id, e = b.body.loan_amount, d = b.body.startdate, f = b.body.enddate,
        g = b.body.installementtype, h = b.body.noofinstallement, k = b.body.dayDifference,
        l = b.body.interest, m = b.body.trepayamount, n = b.body.cid, p = b.body.userid;
    console.log("POST Request :: /insert: ");
    connection.query("INSERT INTO loan SET loan_id = ?, loan_amount = ?, startdate = ?, enddate = ?,  installementtype = ?, noofinstallement = ?,dayDifference = ?, interest = ?, trepayamount = ?, cid = ?, userid = ?;", [a, e, d, f, g, h, k, l, m, n, p], function (a, b, d) {
        a ? c.json({
            status: !1,
            message: "there are some error with query"
        }) : (console.log("The solution is: ", b), c.send({
            code: 200,
            success: "loanuser registered sucessfully"
        }));
    });
});
app.post("/mobile/newmultiuser/", function (b, c) {
    var a = b.body.userid, e = b.body.name, d = b.body.mobile, f = b.body.password;
    console.log("POST Request :: /insert: ");
    connection.query("INSERT INTO multiuser SET userid = ?, name = ?, mobile = ?, password = ?", [a, e, d, f], function (a, b, d) {
        a ? c.json({
            status: !1,
            message: "there are some error with query"
        }) : (console.log("The solution is: ", b), c.send({
            code: 200,
            success: "newmultiuser registered sucessfully"
        }));
    });
});
app.get("/mobile/loanloanact/:cid", function (b, c) {
    connection.query("SELECT  * from loan WHERE cid = ?;", [b.params.cid], function (a, b, d) {
        if (a) {
            throw a;
        }
        c.end(JSON.stringify(b));
    });
});
app.get("/mobile/loanlist", function (b, c) {
    connection.query("SELECT  * from loan", function (a, b, d) {
        if (a) {
            throw a;
        }
        c.end(JSON.stringify(b));
    });
});
app.get("/mobile/installmentlist", function (b, c) {
    connection.query("SELECT  * from installements", function (a, b, d) {
        if (a) {
            throw a;
        }
        c.end(JSON.stringify(b));
    });
});
app.post("/mobile/lastinsertnewuserloan_id", function (b, c) {
    connection.query("SELECT  * from loan WHERE loan_id = ?", [b.body.loan_id], function (a, b, d) {
        if (a) {
            throw a;
        }
        c.end(JSON.stringify(b));
    });
});
app.post("/mobile/insertmydate", function (b, c) {
    var a = b.body.userid, e = b.body.loan_id, d = b.body.installement_amount, f = b.body.mydate,
        g = sizeof(f);
    console.log("POST Request :: /insert: ");
    for (var h = 0; h < g; h += 1) {
        connection.query("INSERT INTO installements SET loan_id = ?, userid = ?, installement_amount = ?, mydate = ?", [e, a, d, f[h]], function (a, b) {
            a || console.log("success");
        });
    }
    c.sendStatus(200);
});
app.get("/mobile/table1/:cid", function (b, c) {
    var a = b.params.cid;
    console.log(a);
    console.log("GET request :: /list/" + a);
    connection.query("SELECT hero.cid, loan.loan_id, loan_amount, address, noofinstallement, interest, dayDifference, startdate, receivedamt, fullname, mobile FROM hero JOIN  loan ON hero.cid = loan.cid WHERE hero.cid  = ?", [a], function (a, b, f) {
        if (a) {
            throw a;
        }
        c.end(JSON.stringify(b));
    });
});
app.get("/mobile/installid/:loan_id", function (b, c) {
    connection.query("SELECT   installements.mydate, installements.installement_id, installements.loan_id, installements.installement_amount  FROM loan JOIN installements  ON   loan.loan_id = installements.loan_id  WHERE loan.loan_id  = ?", [b.params.loan_id], function (a, b, d) {
        if (a) {
            throw a;
        }
        c.end(JSON.stringify(b));
    });
});
app.get("/mobile/tables/:loan_id", function (b, c) {
    connection.query("SELECT   installements.mydate, installements.installement_id, loan.loan_id, installements.installement_amount  FROM loan JOIN installements  ON   loan.loan_id = installements.loan_id  WHERE loan.loan_id  = ?", [b.params.loan_id], function (a, b, d) {
        if (a) {
            throw a;
        }
        c.end(JSON.stringify(b));
    });
});
app.post("/mobile/delete/:installement_id", function (b, c) {
    connection.query("DELETE FROM installements WHERE  installement_id = ?", [b.params.installement_id], function (a, b, d) {
        if (a) {
            throw a;
        }
        c.end(JSON.stringify(b));
    });
});
app.get("/mobile/installementsloan/:installement_id", function (b, c) {
    connection.query("SELECT   mydate, installement_id,  loan.installement_amount  FROM loan JOIN installements  ON   loan.loan_id = installements.loan_id  WHERE installements.installement_id  = ?", [installement_id], function (a, b, d) {
        if (a) {
            throw a;
        }
        c.end(JSON.stringify(b));
    });
});
app.post("/mobile/update", function (b, c) {
    var a = b.body.installement_id, e = b.body.mydate;
    console.log(e);
    var d = b.body.installement_amount;
    console.log(d);
    var f = b.body.loan_id;
    connection.query("SELECT * FROM installements WHERE installement_id = ?", [a], function (b, h, k) {
        0 < h.length && (console.log("error3"), h[0].installement_amount == d ? (console.log("error1"), console.log(d), connection.query("DELETE FROM installements WHERE installement_id = ? ", [a], function (a, d, e) {
            if (b) {
                throw b;
            }
            c.end(JSON.stringify(h));
        })) : connection.query("UPDATE installements SET mydate = ?, installement_amount = installement_amount - ?, loan_id = ? WHERE installement_id = ?; INSERT INTO  transactionmodels SET mydate =?, installement_amount = ?, loan_id =?; ", [e, d, f, a, e, d, f], function (a, b, d) {
            0 === b.length || a ? 0 === b.length ? c.json(data) : (c.json(data), console.log("Error while performing Query: " + a)) : connection.query("SELECT   installements.mydate, installements.installement_id, installements.loan_id, installements.installement_amount  FROM loan JOIN installements  ON   loan.loan_id = installements.loan_id  WHERE loan.loan_id  = ?; ", [f], function (a, b, d) {
                if (a) {
                    throw a;
                }
                c.end(JSON.stringify(b));
            });
        }));
    });
});
app.post("/mobile/transactiontransaction_id/", function (b, c) {
    connection.query("SELECT * FROM  transactionmodels  WHERE transaction_id = ? ORDER BY  transaction_id DESC", [b.body.transaction_id], function (a, b, d) {
        if (a) {
            throw a;
        }
        c.end(JSON.stringify(b));
    });
});
app.post("/mobile/transactionloan_id/", function (b, c) {
    connection.query("SELECT * FROM  transactionmodels  WHERE loan_id = ? ORDER BY  transaction_id DESC", [b.body.loan_id], function (a, b, d) {
        if (a) {
            throw a;
        }
        c.end(JSON.stringify(b));
    });
});
app.get("/mobile/transaction/", function (b, c) {
    connection.query("SELECT * FROM  transactionmodels", function (a, b, d) {
        if (a) {
            throw a;
        }
        c.end(JSON.stringify(b));
    });
});
app.post("/mobile/loansum/", function (b, c) {
    var a = b.body.loan_id;
    connection.query("SELECT * FROM  transactionmodels  WHERE loan_id = ? ORDER BY  transaction_id DESC; UPDATE loan INNER JOIN transactionmodels ON loan.loan_id = transactionmodels.loan_id  SET loan.receivedamt =( SELECT sum(installement_amount) FROM transactionmodels) WHERE transactionmodels.loan_id = ?", [a, a], function (a, b, f) {
        if (a) {
            throw a;
        }
        c.end(JSON.stringify(b));
    });
});
app.get("/mobile/transactionmodels/", function (b, c) {
    connection.query("SELECT * FROM  transactionmodels ORDER BY  transaction_id DESC LIMIT 5;", function (a, b, d) {
        if (a) {
            throw a;
        }
        c.end(JSON.stringify(b));
    });
});
app.post("/mobile/updatemy", function (b, c) {
    var a = b.body.installement_id, e = b.body.mydate;
    console.log(e);
    var d = b.body.installement_amount;
    console.log(d);
    var f = b.body.loan_id;
    connection.query("UPDATE installements SET mydate = ?, installement_amount = ?, loan_id = ? WHERE installement_id = ?; INSERT INTO  transactionmodels SET mydate =?, installement_amount = ?, loan_id =?; ", [e, d, f, a, e, d, f], function (a, b, d) {
        0 === b.length || a || connection.query("SELECT * FROM installements ORDER BY installement_id DESC ", function (a, b, d) {
            if (a) {
                throw a;
            }
            c.end(JSON.stringify(b));
        });
    });
});
app.get("/mobile/installementsloan_id/:loan_id", function (b, c) {
    connection.query("SELECT   mydate, installement_id,  installement_amount  FROM installements   WHERE loan_id = ?", [b.params.loan_id], function (a, b, d) {
        if (a) {
            throw a;
        }
        c.end(JSON.stringify(b));
    });
});
app.get("/mobile/installementsloan/:installement_id", function (b, c) {
    connection.query("SELECT   mydate, installement_id,  installement_amount  FROM installements WHERE installement_id  = ?", [installement_id], function (a, b, d) {
        if (a) {
            throw a;
        }
        c.end(JSON.stringify(b));
    });
});
app.get("/mobile/registeruser", function (b, c) {
    connection.query("SELECT  * from hero WHERE cid = LAST_INSERT_ID();", function (a, b, d) {
        if (a) {
            throw a;
        }
        c.end(JSON.stringify(b));
    });
});
app.get("/mobile/loanuser", function (b, c) {
    connection.query("SELECT  * FROM loan ORDER BY cid DESC LIMIT 1;", function (a, b, d) {
        if (a) {
            throw a;
        }
        c.end(JSON.stringify(b));
    });
});
app.get("/mobile/newuser", function (b, c) {
    connection.query("SELECT * FROM installements ORDER BY installement_id DESC;", function (a, b, d) {
        if (a) {
            throw a;
        }
        c.end(JSON.stringify(b));
    });
});
app.get("/mobile/notification", function (b, c) {
    connection.query("SELECT count(comment_status) as cid FROM hero where comment_status = 0;SELECT * FROM hero ORDER BY cid DESC LIMIT 5;", function (a, b, d) {
        if (a) {
            throw a;
        }
        c.end(JSON.stringify(b));
    });
});
app.get("/mobile/updatenote", function (b, c) {
    connection.query("UPDATE hero SET comment_status = 1 WHERE comment_status = 0", function (a, b, d) {
        if (a) {
            throw a;
        }
        c.end(JSON.stringify(b));
    });
});
app.get("/mobile/expendituressum", function (b, c) {
    connection.query("SELECT sum(Room_Rent) as Room_Rent ,sum(Light_Bill) as Light_Bill,sum(Mobile_Bill) as Mobile_Bill , sum(Payment) as Payment,sum(Petrol) as Petrol,sum(Others) as Others from expenditure ", function (a, b, d) {
        if (a) {
            throw a;
        }
        c.end(JSON.stringify(b));
    });
});
app.get("/mobile/getexpenditure", function (b, c) {
    connection.query("SELECT * from expenditure ", function (a, b, d) {
        if (a) {
            throw a;
        }
        c.end(JSON.stringify(b));
    });
});
app.post("/mobile/getexpenditureid", function (b, c) {
    connection.query("SELECT * from expenditure  where id = ?", [b.param.id], function (a, b, d) {
        if (a) {
            throw a;
        }
        c.end(JSON.stringify(b));
    });
});
app.post("/mobile/expend", function (b, c) {
    var a = b.body.Room_Rent, e = b.body.Light_Bill, d = b.body.Mobile_Bill, f = b.body.Payment,
        g = b.body.Petrol, h = b.body.Others, k = b.body.date;
    console.log(a);
    connection.query("INSERT INTO expenditure SET Room_Rent = ?, Light_Bill = ?, Mobile_Bill = ?, Payment = ?, Petrol = ?,  Others = ?, date = ?", [a, e, d, f, g, h, k], function (a, b, d) {
        a ? c.json({
            status: !1,
            message: "there are some error with query"
        }) : (console.log("The solution is: ", b), c.send({
            code: 200,
            success: "registered expenses sucessfully"
        }));
    });
});
app.post("/mobile/customerdelete", function (b, c) {
    var a = b.body.cid;
    console.log(a);
    connection.query("DELETE FROM hero  WHERE cid = ?", [a], function (a, b, f) {
        a ? c.json({
            status: !1,
            message: "there are some error with query"
        }) : (console.log("The solution is: ", b), c.send({
            code: 200,
            success: "deleted customer record successfully.."
        }));
    });
});
app.post("/mobile/loandelete", function (b, c) {
    var a = b.body.loan_id;
    console.log(a);
    connection.query("DELETE FROM loan  WHERE loan_id = ?", [a], function (a, b, f) {
        a ? c.json({
            status: !1,
            message: "there are some error with query"
        }) : (console.log("The solution is: ", b), c.send({
            code: 200,
            success: "deleted loan id  successfully.."
        }));
    });
});
app.post("/mobile/transactionmodeldelete", function (b, c) {
    var a = b.body.transaction_id;
    console.log(a);
    connection.query("DELETE FROM transactionmodels  WHERE transaction_id = ?", [a], function (a, b, f) {
        a ? c.json({
            status: !1,
            message: "there are some error with query"
        }) : (console.log("The solution is: ", b), c.send({
            code: 200,
            success: "deleted transaction id  successfully.."
        }));
    });
});
app.post("/mobile/installementdelete", function (b, c) {
    var a = b.body.installement_id;
    console.log(a);
    connection.query("DELETE FROM installements  WHERE  installement_id = ?", [a], function (a, b, f) {
        a ? c.json({
            status: !1,
            message: "there are some error with query"
        }) : (console.log("The solution is: ", b), c.send({
            code: 200,
            success: "deleted installment id  successfully.."
        }));
    });
});
app.get("/mobile/roomrent", function (b, c) {
    connection.query("SELECT sum(Room_Rent) as Room_Rents FROM expenditure;SELECT Room_Rent,date FROM expenditure", function (a, b, d) {
        if (a) {
            throw a;
        }
        c.end(JSON.stringify(b));
    });
});
app.get("/mobile/light_bill", function (b, c) {
    connection.query("SELECT sum(Light_Bill) as Light_Bills FROM expenditure;SELECT Light_Bill,date from expenditure", function (a, b, d) {
        if (a) {
            throw a;
        }
        c.end(JSON.stringify(b));
    });
});
app.get("/mobile/mobile_bill", function (b, c) {
    connection.query("SELECT sum(Mobile_Bill) as Mobile_Bills FROM expenditure;SELECT Mobile_Bill,date from expenditure", function (a, b, d) {
        if (a) {
            throw a;
        }
        c.end(JSON.stringify(b));
    });
});
app.get("/mobile/payment", function (b, c) {
    console.log("GET Request :: /payment");
    connection.query("SELECT sum(Payment) as Payments FROM expenditure;SELECT Payment,date from expenditure", function (a, b, d) {
        if (a) {
            throw a;
        }
        c.end(JSON.stringify(b));
    });
});
app.get("/mobile/petrol", function (b, c) {
    console.log("GET Request :: /petrol");
    connection.query("SELECT sum(Petrol) as Petrols FROM expenditure;SELECT Petrol,date from expenditure", function (a, b, d) {
        if (a) {
            throw a;
        }
        c.end(JSON.stringify(b));
    });
});
app.get("/mobile/others", function (b, c) {
    console.log("GET Request :: /others");
    connection.query("SELECT sum(Others) as Otherss FROM expenditure;SELECT Others,date from expenditure", function (a, b, d) {
        if (a) {
            throw a;
        }
        c.end(JSON.stringify(b));
    });
});
app.post("/mobile/newregister", function (b, c) {
    connection.query("INSERT INTO hero SET userid = ?, cid = ?, fullname = ?,  mobile = ?,  idproof = ?, idproofno = ?, address = ?", [b.body.userid, b.body.cid, b.body.fullname, b.body.mobile, b.body.idproof, b.body.idproofno, b.body.address], function (a, b, d) {
        a ? c.json({
            status: !1,
            message: "there are some error with query"
        }) : (console.log("The solution is: ", b), c.send({
            code: 200,
            success: "newuser inserted  sucessfully"
        }));
    });
});
app.post("/mobile/registerusercid", function (b, c) {
    connection.query("SELECT  * from hero WHERE cid = ?", [b.body.cid], function (a, b, d) {
        if (a) {
            throw a;
        }
        c.end(JSON.stringify(b));
    });
});
app.get("/mobile/registerusers", function (b, c) {
    connection.query("SELECT  * FROM hero ORDER BY cid DESC;", function (a, b, d) {
        if (a) {
            throw a;
        }
        c.end(JSON.stringify(b));
    });
});
app.get("/mobile/registermultiusers", function (b, c) {
    connection.query("SELECT  * FROM multiuser ORDER BY userid DESC;", function (a, b, d) {
        if (a) {
            throw a;
        }
        c.end(JSON.stringify(b));
    });
});
app.post("/mobile/newexpenses", function (b, c) {
    connection.query("INSERT INTO expenditure SET userid, money = ?,  expenses = ?,  date = ?", [b.body.userid, b.body.money, b.body.expenses, b.body.date], function (a, b, d) {
        a ? c.json({
            status: !1,
            message: "there are some error with query"
        }) : (console.log("The solution is: ", b), c.send({
            code: 200,
            success: "new expenditure inserted  sucessfully"
        }));
    });
});
var server = app.listen(3343, function () {
    var b = server.address().port;
    console.log("dummy app listening at: ec2-54-164-191-128.compute-1.amazonaws.com:" + b);
});
module.exports = app;
