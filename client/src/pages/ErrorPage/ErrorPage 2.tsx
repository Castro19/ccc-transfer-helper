import React from 'react'
import { Button } from '@/components/ui/button'
import { Link, Navigate } from 'react-router-dom'
import styles from "./ErrorPage.module.css";

const ErrorPage = () => {
    function buttonClicked() {
        console.log("Button was pressed");
    }
  return (
    <div className={styles.title}>404 Not Found
    
    <Link to="/">Home from Link</Link>
    <Button onClick={buttonClicked}>
        Press Button
    </Button>
    </div>
  )
}

export default ErrorPage