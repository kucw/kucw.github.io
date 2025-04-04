/*
  實作 Google OAuth 登入
 */
function initGoogleOAuthLogin() {
    const authContainer = document.getElementById("auth-container");
    const token = getCookie("google_token");

    if (!token) {
        authContainer.innerHTML = '<button onclick="signInWithGoogle()">使用 Google 登入</button>';
    } else {
        fetchUserProfile(token).then(user => {
            authContainer.innerHTML = `<img src="${user.picture}" alt="User Avatar" width="50" height="50">`;
        }).catch(error => {
            console.error("Failed to fetch user profile", error);
        });
    }

    // 檢查 URL 是否包含授權碼
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    if (code) {
        exchangeCodeForToken(code);
    }
}

function signInWithGoogle() {
    const clientId = "295233932330-aauul7ch9e0i6bigloal4olv68fuqi44.apps.googleusercontent.com";
    const redirectUri = "http://localhost:1313";
    const scope = "profile";
    const authUrl = `https://accounts.google.com/o/oauth2/auth?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;
    window.location.href = authUrl;
}

async function exchangeCodeForToken(code) {
    try {
        const response = await fetch("http://localhost:8080/google/exchangeToken", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ code })
        });
        if (!response.ok) {
            throw new Error("Failed to exchange code for token");
        }
        const data = await response.json();

        // 從後端返回的 data 中取得 expires_in
        const expires = new Date(Date.now() + data.expires_in * 1000).toUTCString();
        document.cookie = `google_token=${data.access_token}; Path=/; Expires=${expires};`;

        window.location.href = window.location.pathname; // 重新載入頁面以更新狀態
    } catch (error) {
        console.error("Error exchanging code for token:", error);
    }
}

async function fetchUserProfile(token) {
    const response = await fetch("https://www.googleapis.com/oauth2/v1/userinfo?alt=json", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    if (!response.ok) {
        throw new Error("Invalid token or failed to fetch user info");

    }
    return response.json();
}

function getCookie(name) {
    const cookies = document.cookie.split('; ');
    for (let cookie of cookies) {
        const [key, value] = cookie.split('=');
        if (key === name) {
            return value;
        }
    }
    return null;
}