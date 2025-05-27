using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Playerctrl : MonoBehaviour
{
    public float speed =3.5f;
    private float gravity =10f;
    private CharacterController controller;
    // Start is called before the first frame update
    void Start()
    {
        controller =GetComponent<CharacterController>();
        
    }

    // Update is called once per frame
    void Update()
    {
        PlayerMovement();
    }

    void PlayerMovement()
    {
        float horizontal =Input.GetAxis("Horizontal");
        float vertical = Input.GetAxis("Vertical");
        Vector3 dircetion = new Vector3(horizontal, 0, vertical);
        Vector3 velocity = dircetion *speed;
        velocity = Camera.main.transform.TransformDirection(velocity);
        velocity.y -=gravity;
        controller.Move(velocity * Time.deltaTime);
    }
}
