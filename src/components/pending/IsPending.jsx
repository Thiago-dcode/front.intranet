import React, { useEffect, useState } from 'react'
import useAjax from '../../hooks/useAjax'

export default function IsPending({ className = '', fetchCompany = false, size = '48', color = '#FF3D00' }) {

  

    return (
        <>
            {<span  style={{ borderBottomColor:color, width: size + 'px', height: size + 'px' }} className={"loader m-auto "+className}></span>}
        </>

    )
}
