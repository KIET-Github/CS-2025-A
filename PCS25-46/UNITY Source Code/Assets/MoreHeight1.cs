using System.Collections;
using System.Collections.Generic;
using UnityEngine;
public class MoreHeight1 : MonoBehaviour
{
    public float speed;
    Rigidbody rb;
    public static float time;
    public float timerate;
    public float vtime;
    public static float tmeas;
    float vstart = 0;
    float tstart = 0;
    float mstart = 0;
    int flag = 0;
    int flag1 = 1;




    void Start()
    {
        rb = GetComponent<Rigidbody>();
        tstart = Time.time;
        speed = 0.06f;//Getval1.watspeed/100;
        timerate = 1;// Getval1.watermovetime;
        vtime = 1;// Getval1.watermoveduration;
    }

    // Update is called once per frame
    void Update()
    {
        time = Time.time - tstart;
        if (transform.position.y < 1.8)
        {

            if ((flag1 == 1) && ((time - mstart) >= timerate))
            {

                rb.velocity = new Vector3(0,speed, 0);


                vstart = time;
                flag = 1;
                flag1 = 0;
            }
            if ((flag == 1) && (time - vstart >= vtime))
            {

                rb.velocity = new Vector3(0, 0, 0);
                flag = 0;
                mstart = time;
                flag1 = 1;
            }
            tmeas = time;
        }
        else
        {
            rb.velocity = new Vector3(0, 0, 0);
        }
    }
}
