document.querySelector('#login_button').addEventListener('click', attempt_login);

function valid_login(username)
    {
    window.location.href = "./canvas_example.html";
    }

function invalid_login()
    {
    window.location.href = "./login_page.html";
    }

function attempt_login()
	{
	var username = document.getElementById("username-textbox").value;
	var password = document.getElementById("password-textbox").value;
	console.log(username);
	console.log(password);
	fetch('https://raw.githubusercontent.com/ahwingo/CatanCafe/master/user_data/profiles.json')
	  .then(response => response.json())
      .then(data =>
            {
            console.log(data);
            if (username in data && password=== data[username]["password"])
                {
                valid_login(username);
                }
            else
                {
                invalid_login();
                }
            }
          );
	}

