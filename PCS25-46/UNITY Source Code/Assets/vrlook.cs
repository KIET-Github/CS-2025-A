using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using TMPro;

public class vrlook : MonoBehaviour
{
    private TextMeshProUGUI maxheight;
    public GameObject Max;
    public AudioClip a1;
    public AudioClip a2;
    public AudioClip a3; 
    public AudioClip b1;
    public AudioClip b2;
    public AudioClip b3;
    public AudioClip b4;
    public AudioClip b5;
   
    
    private float tlast;
    private float di;
    private float d;
    private float lastplay;
    private float lastpl;
    private float endingstate=0;

    public Transform vrCamera;
    private float toggleAngle = 30f;
    public float speed = 2;
    public static bool SeeingDown;
    public Rigidbody rd;
    public Text timetxt;
    private CharacterController cc;
    private float Times;
    public static int k = 0;
    public static int started = 0;
    private float TimePtleftseeingdown;
    private float TimePtStartseeingdown;
    public static float Tim;
    public static float Timer;
    public static float Timer1;
    public static int e;
   
    public float Timeg = Getval2.waitingt; 
    public static float TTimeg;
    public static float TTimeg1;
    //private float f1=0;
    //private float f2=0;
    //wait time without seeing down
    public float focusTimenotfalling=Getval2.focunotfall;//focus without falling
    public float focusTimefalling=0.6f;//focus while falling
    // Use this for initialization
   
    void Start()
    {
        
        TTimeg1 = focusTimenotfalling;
        rd= GetComponent<Rigidbody>();
        cc = GetComponent<CharacterController>();
        Times = Time.time;
        maxheight = Max.GetComponent<TextMeshProUGUI>();

    }

    // Update is called once per frame
    void Update()
    {
        TTimeg = Timeg;
        Tim = Time.time - Times;
        if (Getval2.sound=="0") {
            int i = Random.Range(1, 3);
            int j = Random.Range(2, 100);
            if (Tim - lastplay > 5) {
                if (i == 1)
                    AudioSource.PlayClipAtPoint(a1, rd.transform.position, 1);
                if (i == 2)
                    AudioSource.PlayClipAtPoint(a2, rd.transform.position, 1);
                if (i == 3)
                    AudioSource.PlayClipAtPoint(a3, rd.transform.position, 1);
                lastplay = Tim;
            }
            if (Tim - lastpl > 7)
            {
                if (j % 11 == 0)
                    AudioSource.PlayClipAtPoint(b1, new Vector3(rd.transform.position.x, 15, rd.transform.position.z), 1.4f);
                if (j % 3 == 0)
                    AudioSource.PlayClipAtPoint(b2, new Vector3(rd.transform.position.x, 15, rd.transform.position.z), 1.4f);
                if (j % 2 == 0)
                    AudioSource.PlayClipAtPoint(b3, new Vector3(rd.transform.position.x, 15, rd.transform.position.z), 1.4f);
                if (j % 6 == 0)
                    AudioSource.PlayClipAtPoint(b5, new Vector3(rd.transform.position.x, 15, rd.transform.position.z), 1.4f);
                else
                    AudioSource.PlayClipAtPoint(b4, new Vector3(rd.transform.position.x, 15, rd.transform.position.z), 1.4f);
                lastpl = Tim;
            }
        }
        if (ValChange.HighestHigh <= 360&&endingstate==0)
        {
            if (ValChange.hf <= 240 && ValChange.hf > 120&&d!=1) { Timeg = (2*Timeg);d = 1; }
            if (ValChange.hf > 240&&di!=1) { Timeg = (3*Timeg/2);di = 1; }
            Timer = Tim - TimePtleftseeingdown;
            Timer1 = Tim - TimePtStartseeingdown;
            if (rd.transform.position.y <= 27.04) { rd.isKinematic = true; k = 1; }
            if (vrCamera.eulerAngles.x >= toggleAngle && vrCamera.eulerAngles.x < 70.0f)
            {
                SeeingDown = true;

            }
            else
            {
                SeeingDown = false;
            }

            if (SeeingDown)
            {
                if (rd.isKinematic == true)
                {
                    Timer1 = Tim - TimePtStartseeingdown;
                    if (Timer1 >= focusTimenotfalling)
                    {
                        rd.isKinematic = false; k = 0;
                        // Vector3 forward = vrCamera.TransformDirection(Vector3.right);
                        rd.velocity = new Vector3(0, speed, 0);
                        //cc.SimpleMove(forward * speed);
                        TimePtleftseeingdown = Tim;
                    }
                }
                else if (rd.isKinematic == false)
                {
                    if (Tim - TimePtStartseeingdown >= focusTimefalling)
                    {
                        started = 1;
                        rd.isKinematic = false; k = 0;
                        // Vector3 forward = vrCamera.TransformDirection(Vector3.right);
                        rd.velocity = new Vector3(0, speed, 0);
                        //cc.SimpleMove(forward * speed);
                        TimePtleftseeingdown = Tim;
                    }
                }
            }
            else
            {

                if (Timer >= Timeg && !(rd.transform.position.y <= 27.04)) { rd.isKinematic = false; k = 0; }
                else { rd.isKinematic = true; k = 1; }
                // Vector3 forward = vrCamera.TransformDirection(Vector3.right);
                //rd.velocity = new Vector3(0, 0, 0);
                //cc.SimpleMove(forward * speed);
                TimePtStartseeingdown = Tim;
            }
            
            tlast = Tim;

        }
        else
        {
            endingstate = 1;
            if ((int)(Tim - tlast) < 60)
                rd.isKinematic = true;
            if ((int)(Tim - tlast) <= 8)
                Max.SetActive(true);
            if ((int)(Tim - tlast) % 2 == 0)
            {
                maxheight.color = new Color32(184, 29, 19, 255);
            }
            else
            {
                maxheight.color = new Color32(255, 255, 255, 255);
            }
            if ((int)(Tim - tlast) > 8) Max.SetActive(false);
            if ((int)(Tim - tlast) >= 30&& (int)(Tim - tlast) <=38) {
                Max.SetActive(true);
                maxheight.text = "You Will Fall Within "+ (60-((int)(Tim-tlast)))+"sec";
            }
            if ((int)(Tim - tlast) > 38) Max.SetActive(false);

            if ((int)(Tim - tlast) >= 50 && (int)(Tim - tlast) <= 59)
            {
                Max.SetActive(true);
                maxheight.text = "You Will Fall Within " + (60 - ((int)(Tim - tlast))) + "sec";
            }
            if ((int)(Tim - tlast) >= 60)
            {   
                rd.isKinematic = false;
            }

            if (rd.transform.position.y <= ValChange.hi)
            {
                Max.SetActive(true);
                maxheight.text = "END GAME";
                e= 1;
            }
        }
    }
}
