const { spawn } = require('child_process');

// Attach event listener for user input
process.stdout.write('$ ');
process.stdin.on('data', (data) => {
    // Remove newline character from input
    const input = data.toString().trim();

    // Split input into command and arguments
    const [ command, ...args ] = input.split(' ');


    // Execute command
    if (command === 'ls') {
      // Use spawn to execute the 'ls' command
      const ls = spawn('ls', args);

      // Print output of command
      ls.stdout.on('data', (data) => {
        process.stdout.write(data);
      });
    } else if (command === 'lp') {
      // Use spawn to execute the 'ps' command
      const ps = spawn('ps', args);

      // Print output of command
      ps.stdout.on('data', (data) => {
        process.stdout.write(data);
      });
     
    }else if (command === 'run') {
    //run a .sh program
      //const open = spawn('open', args);
      const[ command,fileName,background]=input.split(' ');
      //process.stdout.write(repo)
      if (background==='!'){
        const run= spawn(fileName,{ detached:true, stdio: 'ignore' });  
     }else{
     try {
        const run= spawn(fileName);
        run.stdout.on('data',(data)=>{
        process.stdout.write(data);
        });
      }catch(err){
      	process.stdout.write('Please check your file repository and your file name should not be empty!\n');
      }
     }
      
    } else if (command === 'bing') {
    	const [ command, option, processId ] = input.split(' ');
      	if(command === 'bing' && option === '-k'){
      		const kill = spawn('kill', [processId]);
      		process.stdout.write(`Process with ID:${processId} killed\n`);
     	}else if (command==='bing'&&option==='-p'){
     		const stop=spawn('kill',[' -STOP',processId]);
     		process.stdout.write(`Process with ID:${processId} stopped\n `);
     	}else if(command==='bing'&&option=='-c'){
     		const cont=spawn('kill',[' -CONT',processId]);
     		process.stdout.write(`Process with ID:${processId} continued\n `);
     	}else if(command === 'bing'){
       		process.stdout.write(`Invalid option ${option} for bing command\n`);
      	}
     
    } else if (command === 'keep') {
        const [command,processId]=input.split(' ');
        const keep=spawn(processId,{ detached:true,stdio:'ignore'});
        
    } else if (command === 'exit') {
        process.stdout.write(`Exiting shell...\n`);
        process.exit(0);
    } else {
      // Invalid command
      process.stdout.write(`Invalid command\n`);
    }
    process.stdout.write('$ ');
});

