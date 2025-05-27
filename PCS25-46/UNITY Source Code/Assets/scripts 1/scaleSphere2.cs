using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class scaleSphere2 : MonoBehaviour
{
    Vector3 originalScale;
    float elapsedTime = 0f;
    float changeSpeed = 0.01f;
    bool isGrowing = true;
    void Start()
    {
        originalScale = transform.localScale;
    }

    void Update()
    {
        elapsedTime += Time.deltaTime;

        if (isGrowing)
        {
            transform.localScale = Vector3.Lerp(transform.localScale, originalScale * 3.0f, changeSpeed);
            GetComponent<Renderer>().material.color = Color.Lerp(Color.red, Color.yellow, elapsedTime / 5f);
            if (elapsedTime >= 5f)
            {
                isGrowing = false;
                elapsedTime = 0f;
            }
        }
        else
        {
            transform.localScale = Vector3.Lerp(transform.localScale, originalScale, changeSpeed);
            GetComponent<Renderer>().material.color = Color.Lerp(Color.yellow, Color.red, elapsedTime / 5f);
            if (elapsedTime >= 5f)
            {
                isGrowing = true;
                elapsedTime = 0f;
            }
        }
    }
}
