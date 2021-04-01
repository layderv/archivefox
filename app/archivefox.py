#!/usr/bin/env python3

import sys
import json
import struct
import os
import subprocess

def getMessage():
    rawLength = sys.stdin.buffer.read(4)
    if len(rawLength) == 0:
        sys.exit(0)
    messageLength = struct.unpack('@I', rawLength)[0]
    message = sys.stdin.buffer.read(messageLength).decode('utf-8')
    return json.loads(message)

def encodeMessage(messageContent):
    encodedContent = json.dumps(messageContent).encode('utf-8')
    encodedLength = struct.pack('@I', len(encodedContent))
    return {'length': encodedLength, 'content': encodedContent}

def sendMessage(encodedMessage):
    sys.stdout.buffer.write(encodedMessage['length'])
    sys.stdout.buffer.write(encodedMessage['content'])
    sys.stdout.buffer.flush()

def main():
    while True:
        receivedMessage = getMessage()
        opts = json.loads(receivedMessage)
        os.chdir(os.path.expanduser(opts['directory']))
        subprocess.Popen(['archivebox', 'add', opts['url']],
                stdout=subprocess.DEVNULL,
                stderr=subprocess.DEVNULL,
                stdin=subprocess.DEVNULL)

        sendMessage(encodeMessage("added"))

if __name__ == '__main__':
    main()

