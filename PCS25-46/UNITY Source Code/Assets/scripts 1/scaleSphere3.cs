using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class scaleSphere3 : MonoBehaviour
{
    private Vector3 originalScale;
    private float timeElapsed = 0f;

    void Start()
    {
        originalScale = transform.localScale;
    }

    void Update()
    {
        timeElapsed += Time.deltaTime;
        float size = Mathf.Abs(Mathf.Sin(timeElapsed * 4f));
        transform.localScale = originalScale * (1 + size * 0.1f);
    }
}

