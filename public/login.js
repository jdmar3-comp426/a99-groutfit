

async function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

  
    const response = await fetch("/app/users");
    var users = await response.json();
    
    console.log(users);

    var successful;

    if ([...users].length > 0) {
        for (let i = 0; i < [...users].length; i++) {
            console.log(users[i]['user']);
            if (users[i]['user'] == username){
                successful = true;
                break;
            }
        }
    }

    if (!successful) {
        alert(`user/pass combination invalid, please try again or create an account below`);
    }

    if (successful){
        current_user = username;
        return window.location.href='typingtest.html'
    }


}