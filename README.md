<!DOCTYPE html>
<html lang="bn">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>শুভ জন্মদিন!</title>
    <style>
        body {
            font-family: 'Segoe UI', Arial, sans-serif;
            background: linear-gradient(135deg, #000428 0%, #004e92 100%);
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            overflow: hidden; /* কনফেটির জন্য স্ক্রল বন্ধ */
            color: white;
        }

        .wish-card {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(15px);
            padding: 40px;
            border-radius: 25px;
            border: 1px solid rgba(255, 255, 255, 0.2);
            text-align: center;
            box-shadow: 0 20px 50px rgba(0,0,0,0.5);
            max-width: 400px;
            width: 90%;
            animation: bounce 2s infinite ease-in-out;
        }

        @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-15px); }
        }

        h1 {
            font-size: 35px;
            color: #ff007f; /* গোলাপি শেড */
            text-shadow: 0 0 10px #ff007f;
            margin-bottom: 10px;
        }

        .name {
            font-size: 30px;
            color: #00d2ff;
            font-weight: bold;
        }

        p {
            font-size: 18px;
            color: #e0e0e0;
            line-height: 1.6;
        }

        .cake {
            font-size: 60px;
            margin: 20px 0;
        }

        .button {
            display: inline-block;
            padding: 12px 30px;
            background: #ff007f;
            color: white;
            text-decoration: none;
            border-radius: 50px;
            font-weight: bold;
            margin-top: 20px;
            transition: 0.3s;
            cursor: pointer;
            border: none;
        }

        .button:hover {
            transform: scale(1.1);
            background: #ffffff;
            color: #ff007f;
        }
    </style>
</head>
<body>

    <div class="wish-card">
        <div class="cake">🎂</div>
        <h1>শুভ জন্মদিন!</h1>
        <div class="name">প্রিয় বন্ধু</div> <p>তোমার জীবনের প্রতিটি দিন হোক আনন্দে ভরপুর এবং সাফল্যমণ্ডিত। খুব ভালো কাটুক তোমার আজকের দিনটি!</p>
        
        <button class="button" onclick="celebrate()">উইশ করো 🎊</button>
    </div>

    <script>
        function celebrate() {
            alert("🎈 জন্মদিনের অনেক অনেক শুভেচ্ছা! 🎈");
        }
    </script>

</body>
</html>
