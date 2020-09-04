const getTeacher = async () => { 
    const url = 'http://localhost:3000/api/teacher'
    try {
      const header = new Headers();
      header.append('Accept', 'application/json')
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Accept: 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
  
      });
      console.log(response)
      const data = await response.json();
      
       console.log(data);
    } catch (error) {
      console.log(error)
    }
  }
  
    return (
      <div className="Get">
        <header className="App-header">
          Test
        </header>
        <Button onClick={getTeacher}>GetTeacher</Button>
      </div>
    );