import smtplib
import random
from flask import Flask,jsonify,request
from flask_cors import CORS
from flask_mysqldb import MySQL
import razorpay
from twilio.rest import Client
import os
import cloudinary
import cloudinary.uploader
import datetime

import qrcode
import io
import base64

app=Flask(__name__)

cloudinary.config (cloud_name="dzu51wvvf",api_key="731871515934731",api_secret="gtnlnf0RrNQkf2jfNg0FpCeqeCw")



app.config['MYSQL_HOST']="localhost"
app.config['MYSQL_USER']="root"
app.config['MYSQL_PASSWORD']="bhaga@1234"
app.config['MYSQL_DB']="moneymind"
app.config['MYSQL_CURSORCLASS']="DictCursor"
mysql=MySQL(app)

CORS(app)


@app.route("/login",methods=['POST'])
def login():
    xq=request.json.get('mm')
    a=request.json.get('email')
    if(xq==1):
        p=request.json.get('pho')
        con=mysql.connection.cursor()
        s="select count(id) as dd from customerde where email=%s and phoneno=%s"
        con.execute(s,[a,p])
        r=con.fetchone()
        print("answer",r['dd'])
        if(r['dd']==1):
            ae=random.randint(10000,99999)   
            print(ae)
            u="bhagavathiraja.s26@gmail.com"
            p="epkd mjkm hacj gctx"
            x=smtplib.SMTP("smtp.gmail.com",587)
            x.starttls()
            x.login(user=u,password=p)
            x.sendmail(from_addr=u,to_addrs=[a],msg=f"Subject:Your MoneyMind OTP for Password Change\nDear User,\n \n We received a request to change your MoneyMind account password.\n \n To proceed, please use the One-Time Password (OTP) below:\n \n \t Your OTP is: {ae} \n \n This OTP is valid for 30 minutes. For your security, please do not share it with anyone.\nIf you did not request a password change, please ignore this email your account will remain secure.\n \n Best regards,\nThe MoneyMind Team")
            x.close()
            return jsonify({"message":ae})
        else:
            return jsonify({"message":False})
    if(xq==2):
        p=request.json.get('pho')
        w=request.json.get('password')
        con=mysql.connection.cursor()
        s="update customerde set password=%s where phoneno=%s"
        con.execute(s,[w,p])
        mysql.connection.commit() 
        con.close()
        return jsonify({"message1":True})
    if(xq==0):
        con=mysql.connection.cursor()
        b=request.json.get('name')

        c=request.json.get('password')
        s="select count(id) from customerde where email=%s and name=%s and password=%s"
        con.execute(s,[a,b,c])
        r=con.fetchone()
        print("hell",r['count(id)'])
        

        print(a,b,c,r)
        if(r['count(id)']==1):
            con=mysql.connection.cursor()
            s="select phoneno from customerde where email=%s and name=%s and password=%s"
            con.execute(s,[a,b,c])
            r=con.fetchone()
            print(r['phoneno'])
            a=r['phoneno']
            return jsonify({"message":a})
        else:
            return jsonify({"message":False})
    
@app.route("/reg",methods=['POST'])
def reg():
    si=request.json.get('yr')
    print(si)
    if(si==1):
        print("first")
        aq=request.json.get('name')
        b=request.json.get('email')
        a=random.randint(10000,99999)   
        print(a)
        u="bhagavathiraja.s26@gmail.com"
        p="epkd mjkm hacj gctx"
        x=smtplib.SMTP("smtp.gmail.com",587)
        x.starttls()
        x.login(user=u,password=p)
        x.sendmail(from_addr=u,to_addrs=[b],msg=f"Subject:Your MoneyMind OTP for Registration\nDear User {aq},\n \n Thank you for registering with MoneyMind!\n \n To complete your registration, please use the One-Time Password (OTP) below:\n \n \t Your OTP is: {a} \n \n This OTP is valid for 30 minutes. Please do not share it with anyone for security reasons.\nIf you did not request this registration, please ignore this email.\n \n Best regards,\nThe MoneyMind Team")
        x.close()
        return jsonify({"no":a})
    elif(si==0):
        print("second")
        con=mysql.connection.cursor()
        a=request.json.get('name')
        b=request.json.get('email')
        c=request.json.get('gender')
        d=request.json.get('password')
        e=request.json.get('phoneno')
        f=request.json.get('address')
        g=request.json.get('up')
        s="select count(id) from customerde where phoneno=%s"
        con.execute(s,[b])
        r=con.fetchone()
        if(r['count(id)']==1):
            return jsonify({"message":False})
        else:
            s="insert into customerde (name,email,gender,password,phoneno,address,upi)values(%s,%s,%s,%s,%s,%s,%s);"
            con.execute(s,[a,b,c,d,e,f,g])   
            mysql.connection.commit() 
            con.close()
            return jsonify({"message":True})


@app.route("/profile/<phonen>",methods=['POST','GET'])
def profile(phonen):
        print("hellO",phonen)
        if(request.method=='GET'):
            con = mysql.connection.cursor()
            s = "SELECT * FROM customerde WHERE phoneno=%s"
            con.execute(s, [phonen])
            r = con.fetchone()
            con.close()
            return jsonify(r)
        elif(request.method=='POST'):
            a=request.json.get('name')
            b=request.json.get('email')
            c=request.json.get('gender')
            d=request.json.get('password')
            e=request.json.get('phoneno')
            f=request.json.get('address')
            con=mysql.connection.cursor()
            s="update customerde set name=%s,email=%s,gender=%s,password=%s,phoneno=%s,address=%s where phoneno=%s;"
            con.execute(s,[a,b,c,d,e,f,phonen])
            print(a,b,c,d,e,f)
            mysql.connection.commit()
            return jsonify({"message":True})
        
@app.route("/Contact",methods=['POST'])
def Contact():
    a=request.json.get('name')
    b=request.json.get('email')
    c=request.json.get('phoneno')
    d=request.json.get('title')
    e=request.json.get('message')
    print(a,b,c,d,e)
    try:
        u="bhagavathiraja.s26@gmail.com"
        p="epkd mjkm hacj gctx"
        x=smtplib.SMTP("smtp.gmail.com",587)
        x.starttls()
        x.login(user=u,password=p)
        x.sendmail(from_addr=u,to_addrs=[b],msg=f"Subject:{d}\n{e}")
    except Exception as err:
        print(err)
        return jsonify({"message":str(err)})
    finally:
        x.close()
    print(a,b,c,d,e)
    return jsonify({"message":True})

@app.route("/lend/<pno>",methods=["GET","POST"])
def lend(pno):
    RAZORPAY_KEY_ID = "rzp_test_Rav7PqqDQLc4Wd"
    RAZORPAY_SECRET = "eJ9At1SCU94OqHwPQQQ6cLCa"

    client = razorpay.Client(auth=(RAZORPAY_KEY_ID, RAZORPAY_SECRET))
    if(request.method=='POST'):
        t=request.json.get("cr")
        if(t==1):
            con=mysql.connection.cursor()
            y=request.json.get("mo")
            print("found",y)
            s="DELETE FROM tdata WHERE id=%s"
            con.execute(s,[y])
            mysql.connection.commit()
            return jsonify({"message":True})
        if(t==7):
            con=mysql.connection.cursor()
            q=request.json.get("tid")
            s="select * from tdata where id=%s"
            con.execute(s,[q])
            r=con.fetchone()
            print("checkerrrrrrrrr",r)
            print()
            mysql.connection.commit()
            pq=r['bemail']
            print("email sender")
            print(pq)
            ae=random.randint(10000,99999)
            try:
                u="bhagavathiraja.s26@gmail.com"
                p="epkd mjkm hacj gctx"
                x=smtplib.SMTP("smtp.gmail.com",587)
                print("otp",ae)
                x.starttls()
                x.login(user=u,password=p)
                x.sendmail(from_addr=u,to_addrs=[pq],msg=f"Subject:Moneymind Otp\n Do not share a otp with unknoen person{ae}")
            except Exception as err:
                print(err)
                return jsonify({"message":str(err)})
            finally:
                x.close()


            return jsonify({"checker":ae,"phopay":p})
        
        if(t==2):
            ot=request.json.get('ot')
            con=mysql.connection.cursor()
            s="select amount as a from tdata where id=%s"
            con.execute(s,[ot])
            amount=con.fetchone()
            print(amount)
            if amount is None:
                return jsonify({"error": "No record found for given id"}), 404
            amount=amount['a']
            data = request.get_json()
            am = data.get('amount')  # amount in rupees
            order = client.order.create({"amount": int(amount) * 100, "currency": "INR","payment_capture": 1})
            return jsonify(order)
        if(t==3):
            
            a=request.json.get('name')
            b=request.json.get('fa')
            oid=request.json.get('ot')
            print("date",a,b)
            data = request.get_json()
            print(data)
            razorpay_order_id = data.get('razorpay_order_id')
            razorpay_payment_id = data.get('razorpay_payment_id')
            razorpay_signature = data.get('razorpay_signature')

            try:
                client.utility.verify_payment_signature({
                    'razorpay_order_id': razorpay_order_id,
                    'razorpay_payment_id': razorpay_payment_id,
                    'razorpay_signature': razorpay_signature
                })
                print("payment verifed")
                con=mysql.connection.cursor()
                s="select lmobile from tdata where id=%s;"
                con.execute(s,[oid])
                r=con.fetchone()
                p=r['lmobile']

                w=0

                t=datetime.date.today()
                s="INSERT INTO customer (lname, lmobile,durtype, laddress,lemail, tamount, fintype, bname, bphone, baddress,interest,payd,dued,interestamount,remamount,amtpay,lupi) SELECT lname, lmobile,durtype, laddress,lemail,amount, fintype, bname, bphone, baddress,inttype,CURDATE(),CURDATE(),%s,%s,%s,%s FROM tdata WHERE id=%s;"
                con.execute(s,[w,w,0,p,oid])

                mysql.connection.commit()
                query = """
                UPDATE customer
                SET dued = CASE
                WHEN durtype = '1 Day'   THEN DATE_ADD(payd, INTERVAL 1 DAY)
                WHEN durtype = '1 Week'  THEN DATE_ADD(payd, INTERVAL 1 WEEK)
                WHEN durtype = '1 Month' THEN DATE_ADD(payd, INTERVAL 1 MONTH)
                WHEN durtype = '3 Month' THEN DATE_ADD(payd, INTERVAL 3 MONTH)
                WHEN durtype = '6 Month' THEN DATE_ADD(payd, INTERVAL 6 MONTH)
                WHEN durtype = '1 Year'  THEN DATE_ADD(payd, INTERVAL 1 YEAR)
            END
                WHERE durtype IN (
                '1 Day',
                '1 Week',
                '1 Month',
                '3 Month',
                '6 Month',
                '1 Year'
                );
                """
                con.execute(query)
                mysql.connection.commit()
                con = mysql.connection.cursor()
                con.execute("""
                UPDATE customer
                SET dued = DATE_ADD(payd, INTERVAL 100 DAY)
                WHERE fintype = 'Daily Collection Model'
                """)
                con.execute("""
                            UPDATE customer
                            SET dued = DATE_ADD(payd, INTERVAL 10 WEEK)
                            WHERE fintype = 'Weekly Collection Model';
                """)
                mysql.connection.commit()
                print("✅ Data inserted successfully!")
                s="DELETE FROM tdata WHERE id=%s"
                con.execute(s,[oid])
                mysql.connection.commit()
                con.close()
                return jsonify({"status": "success"})
            except Exception as e:
                print("❌ Error in payment verification:",e)
                return jsonify({"status": "failed"})
                
    else:
        con=mysql.connection.cursor()
        s="select* from customer where lmobile=%s"
        con.execute(s,[pno])
        r=con.fetchall()
        print("before email",pno)
        s1="select *from tdata where lmobile=%s"
        con.execute(s1,[pno])
        r1=con.fetchall()
        print("second",r1)
        return jsonify({"a":r,"b":r1})

@app.route("/interest/<pno>",methods=["GET","POST"])
def interest(pno):
    con=mysql.connection.cursor()
    if(request.method=='POST'):
        y=request.json.get("mo")
        print("found",y)
        s="DELETE FROM tdata WHERE id=%s"
        con.execute(s,[y])
        mysql.connection.commit()
        return jsonify({"message":True})
    s="select* from tdata where bphone=%s"
    con.execute(s,[pno])
    r=con.fetchall()
    return jsonify(r)

@app.route("/product/<phonen>",methods=['GET','POST'])
def Product(phonen):
    print(phonen)
    if(request.method=='GET'):
        print("truee")
        con=mysql.connection.cursor()
        s="select* from products"
        con.execute(s)
        r=con.fetchall()
        return jsonify(r)
    elif request.method == 'POST':
        dec=request.json.get('a')
        if(dec==2):
            print("insert statement")
            id=request.json.get('idd')
            mo="NO"
            print("iiiiiii",id,mo)
            con=mysql.connection.cursor()
            s = """            INSERT INTO tdata (
                lname, lmobile, laddress, amount,lemail,fintype, inttype,
                doctype, durtype, bname, bphone, baddress,bemail
            )
            SELECT 
                p.username, p.mobileno, p.address, p.amount,p.email, p.finance, p.interest,
                %s, p.duration,
                c.name, c.phoneno, c.address,c.email
            FROM products p
            JOIN customerde c ON c.phoneno = %s
            WHERE p.id = %s """
            con.execute(s,[mo,phonen,id])
            mysql.connection.commit()
            con.close()
            return jsonify({"message":True})
        
@app.route("/fileupload/<phonen>",methods=['POST'])
def file(phonen):
    print("file insert statement",phonen)
    id=request.form.get('idd')
    file = request.files.get('file')
    print("iiiiiii",id)
    mo="YES"
    upload_result = cloudinary.uploader.upload(file)
    url=upload_result["secure_url"]
    con=mysql.connection.cursor()
    s = """            INSERT INTO tdata (
                lname, lmobile, laddress, amount,lemail , fintype, inttype,
                doctype, durtype, bname, bphone, baddress,bemail
            )
            SELECT 
                p.username, p.mobileno, p.address, p.amount,p.email,p.finance, p.interest,
                %s, p.duration,
                c.name, c.phoneno, c.address,c.email
            FROM products p
            JOIN customerde c ON c.phoneno = %s
            WHERE p.id = %s """
    con.execute(s,[url,phonen,id])
    mysql.connection.commit()
    con.close()
    return jsonify({"message":True})



@app.route("/filter",methods=['GET','POST'])
def Product1():
        a=request.json.get('ftype')
        b=int(request.json.get('itype'))
        c=int(request.json.get('amt'))
        d=request.json.get('dtype')
        e=request.json.get('du')
        con = mysql.connection.cursor()
        query = "SELECT * FROM products WHERE 1=1"
        values = []

        if c not in [None, "", "NULL", 0]:
            query += " AND amount <= %s"
            values.append(c)

        if a not in [None, "", "NULL"]:
            query += " AND finance = %s"
            values.append(a)

        if b not in [None, "", "NULL", 0]:
            query += " AND interest <= %s"
            values.append(b)

        if d not in [None, "", "NULL"]:
            query += " AND document = %s"
            values.append(d)

        if e not in [None, "", "NULL"]:
            query += " AND duration = %s"
            values.append(e)

        con.execute(query, tuple(values))
        r = con.fetchall()
        return jsonify(r)
        
@app.route("/insert/<phonen>",methods=['GET','POST'])
def Product2(phonen):
            print("backend is running")
            a=request.json.get('ftype')
            b=int(request.json.get('itype'))
            c=int(request.json.get('amt'))
            d=request.json.get('dtype')
            e=request.json.get('du')
            con=mysql.connection.cursor()
            s="insert into products(username, mobileno,address,email, amount, finance, interest, document, duration) select name,phoneno,address,email,%s,%s,%s,%s,%s from customerde where phoneno=%s"
            print("update are maded")
            con.execute(s,[c,a,b,d,e,phonen])
            mysql.connection.commit()
            print("connect close")
            con.close()
            return jsonify({"message":True})

@app.route("/colmod/<phone>",methods=['GET','POST'])
def colmod(phone):
    print("correctly working",phone)
    con=mysql.connection.cursor()
    s="select *from customer where bphone=%s"
    con.execute(s,[phone])
    d=con.fetchall()
    return jsonify({"message":d})



@app.route("/generate-qr", methods=["POST"])
def generate_qr():
    data = request.get_json()

    if not data or "amount" not in data:
        return jsonify({"error": "Amount missing"}), 400

    amount = data["amount"]
    id=data["id"]
    print("iddddla",id)
    con=mysql.connection.cursor()
    s="select lupi from customer where id=%s"
    con.execute(s,[id])
    d=con.fetchone()
    p=d["lupi"]
    upi_id = p
    name = "Borrower"
    txn_id = "TXN123456"
    upi_link = (
        f"upi://pay?"
        f"pa={upi_id}&"
        f"pn={name}&"
        f"am={amount}&"
        f"cu=INR&"
        f"tr={txn_id}"
    )

    qr = qrcode.make(upi_link)
    buf = io.BytesIO()
    qr.save(buf, format="PNG")

    qr_base64 = base64.b64encode(buf.getvalue()).decode("utf-8")

    return jsonify({"qr": qr_base64})



@app.route("/otpver",methods=['GET','POST'])
def intotp():
    a=request.json.get('win')
    con=mysql.connection.cursor()
    s="select lemail from customer where id=%s"
    con.execute(s,[a])
    d=con.fetchone() 
    q=d['lemail']
    a=random.randint(10000,99999)  
    u="bhagavathiraja.s26@gmail.com"
    p="epkd mjkm hacj gctx"
    x=smtplib.SMTP("smtp.gmail.com",587)
    x.starttls()
    x.login(user=u,password=p)
    x.sendmail(from_addr=u,to_addrs=[q],msg=f"Subject:Your MoneyMind OTP for Payment\nDear User ,\n \n Thank you for payment with MoneyMind!\n \n To complete your payment, please use the One-Time Password (OTP) below:\n \n \t Your OTP is: {a} \n \n This OTP is valid for 30 minutes. Please do not share it with anyone for security reasons.\nIf you did not request this registration, please ignore this email.\n \n Best regards,\nThe MoneyMind Team")
    x.close()
    print(a)
    return jsonify({"message":a})

@app.route("/sucpayment",methods=['GET','POST'])
def succpay():
    a1=request.json.get('type')
    a=request.json.get('win')
    b=request.json.get('Amount')
    if(int(a1)==100):
        con=mysql.connection.cursor()
        s="""
            UPDATE customer
            SET amtpay = amtpay + %s
            WHERE id = %s
        """
        con.execute(s,[b, a])
        con.execute("""
            UPDATE customer
            SET remamount = tamount - amtpay
            WHERE id = %s
        """, (a,))
        mysql.connection.commit()
        return jsonify({"message":"success"})
    elif(int(a1)==12):
        con=mysql.connection.cursor()
        con.execute("""
            DELETE FROM customer
            WHERE id=%s
        """, (a,))
        mysql.connection.commit()
        return jsonify({"message":"success"})
    else:
        con = mysql.connection.cursor()
        con.execute("""
            UPDATE customer
            SET payd = CURDATE()
            WHERE id = %s
        """, (a,))
        mysql.connection.commit()
        s="""
            UPDATE customer
            SET amtpay = amtpay + %s
            WHERE id = %s
        """
        con.execute(s,[b, a])
        mysql.connection.commit()
        return jsonify({"message": "success"})

@app.get("/receiver")
def get_receiver():
    return jsonify({
        "name": "Customer A",
        "phone": "9443278330"
    })


if __name__=='__main__':
    app.run(debug=True)