using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using TMPro;
using System;
using UnityEngine.UI;


public class ValChange : MonoBehaviour
{ public  static int hi;
public static int hf;
int condition;
public static int min;
    public static float HighestHigh = 0;
    // int flag;
    public GameObject Timeobj;
    public GameObject Heigh;
    public GameObject Headwait;
    public GameObject waitstill;
    public GameObject focusnf;
    public GameObject cam;
    private TextMeshProUGUI timee;
    private TextMeshProUGUI heig;
    private TextMeshProUGUI waisti;
    private TextMeshProUGUI headait;
    private TextMeshProUGUI focun;
    public static string s1;
    string s2;
    string s3;
    string s4;
    //public static string t1;

    //timetxt = Timeobj.GetComponent<TextMeshPro>().text.Replace;
    // Start is called before the first frame update
    void Start()
    {   
        timee= Timeobj.GetComponent<TextMeshProUGUI>();
        heig= Heigh.GetComponent<TextMeshProUGUI>();
        focun= focusnf.GetComponent<TextMeshProUGUI>();
        waisti= waitstill.GetComponent<TextMeshProUGUI>();
        headait= Headwait.GetComponent<TextMeshProUGUI>();
        hi = (int)cam.transform.position.y;
    }
    //Debug.Log(Tim.ToString());
    //  string s = Tim.ToString();
    //timetxt.SetText(s);
    // Update is called once per frame
    void Update()
    {
        if(vrlook.e!=1)f();
        timee.text =s1;
        h();
        heig.text = s2;
        w();
        waisti.text=s3;
        if (condition == 3) {
           
            waisti.color =new Color(1,1,1,1);
            headait.color =new Color(1, 1, 1, 1);
        }
        else if (condition == 2) {
            
            waisti.color =new Color(239,183,0,255); 
            headait.color =new Color(239,183,0,255); 
        }
        else if (condition == 1) {
           
            waisti.color =new Color32(184,29,19,255); 
            headait.color =new Color32(184,29,19,255); 
        }
        fs();
        focun.text = s4;
    }
    private void f()
    {
        int ab = (int)vrlook.Tim;
        int abc= ab%60;
        min = ab / 60;
        if (min != 0)
        {
            s1 = min.ToString() + " min " + abc.ToString() + " sec";
        }
        else { s1 = abc.ToString() + " sec"; }
    }
    private void h()
    {
        hf=(int)Math.Ceiling(cam.transform.position.y-hi)-1;
        s2 = hf.ToString();
        if (hf > HighestHigh) { HighestHigh = hf; Debug.Log("Height "+ hf); }
            
    }
    private void w()
    {
        float abcd=vrlook.TTimeg - vrlook.Timer;
        int aba = (int)Math.Ceiling(abcd);
        if (abcd >= 0 && vrlook.started == 1)
        {
            s3 = aba.ToString();
            //Debug.Log((abcd / vrlook.TTimeg) * 100);
            if ((aba / vrlook.TTimeg) * 100 <= 30) condition = 1;
            else if ((aba / vrlook.TTimeg) * 100 > 30) condition = 2;
             if ((aba / vrlook.TTimeg) * 100 > 70) condition = 3;
        }
        else
        {
            abcd = vrlook.TTimeg;
            s3 = abcd.ToString();
            condition = 3;
        }
        
    }
    private void fs()
    {
        float abcd = vrlook.TTimeg1 - vrlook.Timer1;
        int aba = (int)Math.Ceiling(abcd);
        if (aba >= 0 && vrlook.k == 1)
        {
            s4 = aba.ToString();
           // flag = 1;
        }
        else
        {
           // if (abcd >= 0 && vrlook.k == 0 && flag!=1) { s4 = "Falling Focus Time!!";flag = 0; }
          //  else
           // {
                abcd = (int)vrlook.TTimeg1;
                s4 = abcd.ToString();
             //   flag = 0;
           // }
        }
    }

}
