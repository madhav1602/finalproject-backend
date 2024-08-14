const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
const port = 8081;

var cors = require('cors');
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// const db = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'root',
//   database: 'finalproject',
// });

const db = mysql.createConnection({
  host: 'bfd2jtxjwr2tlwyhrcir-mysql.services.clever-cloud.com',
  user: 'udngt2m98aqbmwjy',
  password: 'KJnHTrUKY8PyRZVIwDJO',
  database: 'bfd2jtxjwr2tlwyhrcir',
});


db.connect((err) => {
  if (err) {
    console.error('Database connection error:', err);
  } else {
    console.log('Connected to the database');
  }
});
app.get('/', (req, res) => {
    res.render('index');
});

app.post('/createUser', (req, res) => {
  const { name, email, pass, dob,  phonenumber, gender } = req.body;
  const query = `INSERT INTO USER (name, email, pass, dob,  phonenumber, gender) VALUES (?, ?, ?, ?, ?, ?)`;
  db.query(query, [name, email, pass, dob,  phonenumber, gender], (err, result) => {
    if (err) throw err;
    console.log('User created successfully');
    res.redirect('/listUsers');
  });
});


app.get('/listUsers', (req, res) => {
  const query = 'SELECT * FROM USER';
  db.query(query, (err, results) => {
    if (err) throw err;
    res.render('listUsers', { users: results });
  });
});


app.get('/editUser/:userid', (req, res) => {
    const userId = req.params.userid;

    
    const query = 'SELECT * FROM USER WHERE userid = ?';

    db.query(query, [userId], (err, result) => {
        if (err) {
            console.error('Error fetching user details:', err);
            throw err;
        }

        const user = result[0]; 

       
        res.render('editUser', { user });
    });
});

app.post('/editUser/:userid', (req, res) => {
  const { name, email, pass, dob,  phonenumber, gender } = req.body;
  const { userid } = req.params;
  const query = `UPDATE USER SET name=?, email=?, pass=?, dob=?,  phonenumber=?, gender=? WHERE userid=?`;
  db.query(query, [name, email, pass, dob,  phonenumber, gender, userid], (err, result) => {
    if (err) throw err;
    console.log('User updated successfully');
    res.redirect('/listUsers');
  });
});


app.get('/deleteUser/:userid', (req, res) => {
  const { userid } = req.params;
  const query = 'DELETE FROM USER WHERE userid=?';
  db.query(query, [userid], (err, result) => {
    if (err) throw err;
    console.log('User deleted successfully');
    res.redirect('/listUsers');
  });
});


app.get('/addUser', (req, res) => {
  res.render('addUser');
});


app.post('/createAuthor', (req, res) => {
    const { aname, email, password, dob, dor, phonenumber, gender, photourl } = req.body;
    const query = `INSERT INTO Author (aname, email, password, dob, dor,  phonenumber, gender, photourl) VALUES (?, ?, ?, ?,  ?, ?, ?, ?)`;
    db.query(query, [aname, email, password, dob, dor, phonenumber, gender, photourl], (err, result) => {
      if (err) throw err;
      console.log('Author created successfully');
      res.redirect('/listAuthors');
    });
  });
  

  app.get('/listAuthors', (req, res) => {
    const query = 'SELECT * FROM Author';
    db.query(query, (err, results) => {
      if (err) throw err;
      res.render('listAuthors', { authors: results });
    });
  });
  

app.get('/editAuthor/:aid', (req, res) => {
    const authorId = req.params.aid;

    db.query('SELECT * FROM Author WHERE aid = ?', [authorId], (err, author) => {
        if (err) throw err;

        res.render('editAuthor', { author: author[0] });
    });
});


  app.post('/editAuthor/:aid', (req, res) => {
    const { aname, email, password, dob,  phonenumber, gender, photourl } = req.body;
    const { aid } = req.params;
    const query = `UPDATE Author SET aname=?, email=?, password=?, dob=?,  phonenumber=?, gender=?, photourl=? WHERE aid=?`;
    db.query(query, [aname, email, password, dob,  phonenumber, gender, photourl, aid], (err, result) => {
      if (err) throw err;
      console.log('Author updated successfully');
      res.redirect('/listAuthors');
    });
  });
  

  app.get('/deleteAuthor/:aid', (req, res) => {
    const { aid } = req.params;
    const query = 'DELETE FROM Author WHERE aid=?';
    db.query(query, [aid], (err, result) => {
      if (err) throw err;
      console.log('Author deleted successfully');
      res.redirect('/listAuthors');
    });
  });
  
  
  app.get('/addAuthor', (req, res) => {
    res.render('addAuthor');
  });


app.post('/createContent', (req, res) => {
    const { title, cid, aid, description } = req.body;
    const query = `INSERT INTO Content (title, cid, aid, description) VALUES (?, ?, ?, ?)`;
    db.query(query, [title, cid, aid, description], (err, result) => {
      if (err) throw err;
      console.log('Content created successfully');
      res.redirect('/listContents');
    });
  });
  
  
  app.get('/listContents', (req, res) => {
    const query = 'SELECT * FROM Content';
    db.query(query, (err, results) => {
      if (err) throw err;
      res.render('listContents', { contents: results });
    });
  });
  
app.get('/editContent/:contentid', (req, res) => {
    const contentId = req.params.contentid;


    db.query('SELECT * FROM Content WHERE contentid = ?', [contentId], (err, content) => {
        if (err) throw err;

        

        res.render('editContent', { content: content[0] });
    });
});

app.post('/editContent/:contentid', (req, res) => {
  const { title, description } = req.body;
  const { contentid } = req.params;
  
  
  const { cid, aid } = req.body;

  const query = `UPDATE Content SET title=?, description=? WHERE contentid=?`;
  
  db.query(query, [title, description, contentid], (err, result) => {
      if (err) throw err;
      console.log('Content updated successfully');
      res.redirect('/listContents');
  });
});

  
  
  app.get('/deleteContent/:contentid', (req, res) => {
    const { contentid } = req.params;
    const query = 'DELETE FROM Content WHERE contentid=?';
    db.query(query, [contentid], (err, result) => {
      if (err) throw err;
      console.log('Content deleted successfully');
      res.redirect('/listContents');
    });
  });
  

  app.get('/addContent', (req, res) => {
    
    const categoryQuery = 'SELECT * FROM Content_category';
    const authorQuery = 'SELECT * FROM Author';
  
    db.query(categoryQuery, (err, categories) => {
      if (err) throw err;
  
      db.query(authorQuery, (err, authors) => {
        if (err) throw err;
  
        res.render('addContent', { categories, authors });
      });
    });
  });

  
app.post('/createSubscriptionPlan', (req, res) => {
    const { plan_name, price, duration } = req.body;
    const query = `INSERT INTO SubscriptionPlan (plan_name, price, duration) VALUES (?, ?, ?)`;
    db.query(query, [plan_name, price, duration], (err, result) => {
      if (err) throw err;
      console.log('Subscription plan created successfully');
      res.redirect('/listSubscriptionPlans');
    });
  });
  
  
  app.get('/listSubscriptionPlans', (req, res) => {
    const query = 'SELECT * FROM SubscriptionPlan';
    db.query(query, (err, results) => {
      if (err) throw err;
      res.render('listSubscriptionPlans', { plans: results });
    });
  });
  
  
  app.post('/editSubscriptionPlan/:sid', (req, res) => {
    const { plan_name, price, duration } = req.body;
    const { sid } = req.params;
    const query = `UPDATE SubscriptionPlan SET plan_name=?, price=?, duration=? WHERE sid=?`;
    db.query(query, [plan_name, price, duration, sid], (err, result) => {
      if (err) throw err;
      console.log('Subscription plan updated successfully');
      res.redirect('/listSubscriptionPlans');
    });
  });

  app.post('/editSubscriptionPlan/:sid', (req, res) => {
    const { plan_name, price, duration } = req.body;
    const { sid } = req.params;
    const query = `UPDATE SubscriptionPlan SET plan_name=?, price=?, duration=? WHERE sid=?`;
    db.query(query, [plan_name, price, duration, sid], (err, result) => {
      if (err) throw err;
      console.log('Subscription plan updated successfully');
      res.redirect('/listSubscriptionPlans');
    });
  });
  
  
  app.get('/deleteSubscriptionPlan/:sid', (req, res) => {
    const { sid } = req.params;
    const query = 'DELETE FROM SubscriptionPlan WHERE sid=?';
    db.query(query, [sid], (err, result) => {
      if (err) throw err;
      console.log('Subscription plan deleted successfully');
      res.redirect('/listSubscriptionPlans');
    });
  });
  
 
  app.get('/addSubscriptionPlan', (req, res) => {
    res.render('addSubscriptionPlan');
  });
  

  
app.post('/createUserSubscriptionPlan', (req, res) => {
    const { userid, spid, startdate, enddate } = req.body;
    const query = `INSERT INTO UserSubscriptionPlan (userid, spid, startdate, enddate) VALUES (?, ?, ?, ?)`;
    db.query(query, [userid, spid, startdate, enddate], (err, result) => {
      if (err) throw err;
      console.log('User subscription plan created successfully');
      res.redirect('/listUserSubscriptionPlans');
    });
  });
  

  app.get('/listUserSubscriptionPlans', (req, res) => {
    const query = 'SELECT * FROM UserSubscriptionPlan';
    db.query(query, (err, results) => {
      if (err) throw err;
      res.render('listUserSubscriptionPlans', { userSubscriptionPlans: results });
    });
  });
  
  
app.get('/editUserSubscriptionPlan/:userid/:spid', (req, res) => {
    const userId = req.params.userid;
    const subscriptionPlanId = req.params.spid;

    db.query('SELECT * FROM UserSubscriptionPlan WHERE userid = ? AND spid = ?', [userId, subscriptionPlanId], (err, userSubscription) => {
        if (err) throw err;

        res.render('editUserSubscriptionPlan', { userSubscription: userSubscription[0] });
    });
});


  app.post('/editUserSubscriptionPlan/:userid/:spid', (req, res) => {
    const { startdate, enddate } = req.body;
    const { userid, spid } = req.params;
    const query = `UPDATE UserSubscriptionPlan SET startdate=?, enddate=? WHERE userid=? AND spid=?`;
    db.query(query, [startdate, enddate, userid, spid], (err, result) => {
      if (err) throw err;
      console.log('User subscription plan updated successfully');
      res.redirect('/listUserSubscriptionPlans');
    });
  });
  
  
  app.get('/deleteUserSubscriptionPlan/:userid/:spid', (req, res) => {
    const { userid, spid } = req.params;
    const query = 'DELETE FROM UserSubscriptionPlan WHERE userid=? AND spid=?';
    db.query(query, [userid, spid], (err, result) => {
      if (err) throw err;
      console.log('User subscription plan deleted successfully');
      res.redirect('/listUserSubscriptionPlans');
    });
  });
  
  
  app.get('/addUserSubscriptionPlan', (req, res) => {
    
    const userQuery = 'SELECT * FROM USER';
    const planQuery = 'SELECT * FROM SubscriptionPlan';
  
    db.query(userQuery, (err, users) => {
      if (err) throw err;
  
      db.query(planQuery, (err, plans) => {
        if (err) throw err;
  
        res.render('addUserSubscriptionPlan', { users, plans });
      });
    });
  });

  
app.post('/createContactUs', (req, res) => {
    const { name, email, subject, query, date } = req.body;
    const queryStr = `INSERT INTO ContactUs (name, email, subject, query, date) VALUES (?, ?, ?, ?, ?)`;
    db.query(queryStr, [name, email, subject, query, date], (err, result) => {
      if (err) throw err;
      console.log('Contact Us entry created successfully');
      res.redirect('/listContactUs');
    });
  });
  
  
  app.get('/listContactUs', (req, res) => {
    const queryStr = 'SELECT * FROM ContactUs';
    db.query(queryStr, (err, results) => {
      if (err) throw err;
      res.render('listContactUs', { contactEntries: results });
    });
  });
  

app.get('/editContactUs/:id', (req, res) => {
    const contactUsId = req.params.id;

    
    db.query('SELECT * FROM ContactUs WHERE id = ?', [contactUsId], (err, contactUs) => {
        if (err) throw err;

        res.render('editContactUs', { contactUs: contactUs[0] });
    });
});


app.post('/editContactUs/:id', (req, res) => {
  const { name, email, subject, query, date } = req.body;
  const { id } = req.params;

  
  const formattedDate = new Date(date).toISOString().slice(0, 19).replace("T", " ");

  const queryStr = `UPDATE ContactUs SET name=?, email=?, subject=?, query=?, date=? WHERE id=?`;

  db.query(queryStr, [name, email, subject, query, formattedDate, id], (err, result) => {
      if (err) throw err;
      console.log('Contact Us entry updated successfully');
      res.redirect('/listContactUs');
  });
});


  

  app.get('/deleteContactUs/:id', (req, res) => {
    const { id } = req.params;
    const queryStr = 'DELETE FROM ContactUs WHERE id=?';
    db.query(queryStr, [id], (err, result) => {
      if (err) throw err;
      console.log('Contact Us entry deleted successfully');
      res.redirect('/listContactUs');
    });
  });
  
  
  app.get('/addContactUs', (req, res) => {
    res.render('addContactUs');
  });



  app.use(bodyParser.json());
  
  
  
app.post('/login', (req, res) => {
  const { email, pass } = req.body;

  
  const query = 'SELECT * FROM user WHERE email = ? AND pass = ?';
  db.query(query, [email, pass], (err, result) => {
    if (err) {
      console.error('Error executing query: ' + err.stack);
      res.status(500).send('Internal Server Error');
      return;
    }

    if (result.length > 0) {
      
      res.status(200).json({ success: true, message: 'Login successful' });
    } else {
      
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  });
});

app.post('/register', (req, res) => {
  const { name, email, phonenumber, password, dob, gender } = req.body;

  const query = 'INSERT INTO user (name, email, phonenumber, pass, dob, gender) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(query, [name, email, phonenumber, password, dob, gender], (err, result) => {
    if (err) {
      console.error('Error executing query: ' + err.stack);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
      return;
    }

    
    res.status(200).json({ success: true, message: 'User registered successfully' });
  });
});


app.post('/submit-contact', (req, res) => {
  const { name, email, subject, query } = req.body;

  
  const insertQuery = 'INSERT INTO ContactUs (name, email, subject, query, date) VALUES (?, ?, ?, ?, NOW())';
  db.query(insertQuery, [name, email, subject, query], (err, result) => {
    if (err) {
      console.error('Error inserting data into ContactUs table:', err);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    } else {
      console.log('Form data inserted successfully');
      res.json({ success: true, message: 'Form submitted successfully' });
    }
  });
});

app.use(bodyParser.json());


app.post('/create-author', (req, res) => {
  const { aname, email, password, dob, dor, phonenumber, gender, photourl } = req.body;

 
  const query = 'INSERT INTO author (aname, email, password, dob, dor, phonenumber, gender, photourl) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
  db.query(query, [aname, email, password, dob, dor, phonenumber, gender, photourl], (error, results) => {
    if (error) {
      console.error('Error executing query:', error);
      return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }

    return res.status(200).json({ success: true, message: 'Author created successfully' });
  });
});

app.get('/api/contents', (req, res) => {
  const query = 'SELECT * FROM content';

  db.query(query, (error, results) => {
    if (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }

    res.status(200).json(results);
  });
});


app.post('/api/contents', (req, res) => {
  const { title, description } = req.body;

  const query = 'INSERT INTO content (title, description) VALUES (?, ?)';
  db.query(query, [title, description], (error, result) => {
    if (error) {
      console.error('Error adding story:', error);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      const newStoryId = result.insertId;
      res.status(201).json({
        contentid: newStoryId,
        title,
        description,
      });
    }
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
