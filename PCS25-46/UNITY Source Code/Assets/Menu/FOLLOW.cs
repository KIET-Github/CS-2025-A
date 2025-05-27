using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class FOLLOW : MonoBehaviour
{
    // Start is called before the first frame update
    public void GITHUB()
    {
        Application.OpenURL("http://www.github.com/manipta");


    } 
    public void INSTA()
    {
        Application.OpenURL("http://www.instagram.com/wga_developer/");
        
    } 
    
    public void Gmail()
    {
        string email = "manigarg2002@gmail.com";
        string subject = MyEscapeURL("Used Your App and Wanna Review it :)");
        string body = MyEscapeURL("AppName: DePhobia\nName:\nAddress:\n");
        Application.OpenURL("mailto:" + email + "?subject=" + subject + "&body=" + body);
    }
    string MyEscapeURL(string url)
    {
        return WWW.EscapeURL(url).Replace("+", "%20");
    }
}
