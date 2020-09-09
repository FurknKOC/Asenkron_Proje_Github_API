// Elementleri Seçme

const githubForm = document.getElementById("github-form");
const nameInput = document.getElementById("githubname");
const clearLastUsers = document.getElementById("clear-last-users");
const lastUsers = document.getElementById("last-users");
const github = new Github();
const ui = new UI();

eventListeners();

function eventListeners()
{
    githubForm.addEventListener("submit",getData);
    clearLastUsers.addEventListener("click",clearAllSearched);
    document.addEventListener("DOMContentLoaded",getAllSearched);

}

function getData(e)
{
    let username = nameInput.value.trim();
    if (username === "") 
    {
        alert("Lütfen Geçerli Bir Kullanıcı Adı Girin.");    
    }
    else
    {
        github.getGithubData(username)
        .then(response =>
            {
                if (response.user.message === "Not Found") 
                {
                    //Hata Mesajı
                    ui.showError("Kullanıcı Bulunamadı!");
                }
                else
                {
                    ui.addSearchedUserToUI(username);
                    Storage.addSearchedUserToStorage(username);
                    ui.showUserInfo(response.user);
                    ui.showRepoInfo(response.repo);
                }
            })
        .catch(err => ui.showError(err));
    }
    ui.clearInput(); //Inputu temizleme
    e.preventDefault();
}

function clearAllSearched()
{
    //Tüm arananları temizle
    if (confirm("Emin misiniz?")) 
    {
        // Silme 
        Storage.clearAllSearchedUsersFromStorage(); // Storagedan Temizle
        ui.clearAllSearchedFromUI(); 
    }
}

function getAllSearched()
{
    //Arananları storagedan al ve UI'e ekle
    let users = Storage.getSearchedUsersFromStorage();
    let result = "";
    users.forEach(user => {
        result += `<li class="list-group-item">${user}</li>`;
    });
    lastUsers.innerHTML = result;
}