const MESSAGES = {

     // User Authentication
     '1001': 'Register successfully',
     '1002': 'Sign in successfully',
     '1003': 'Get profile successfully',
     '1004': 'Already registered with this email !',
     '1005': 'Please enter correct email and password',
     '1006': 'Logout successfully',
     '1007': 'User not found!',
     '1008': 'Profile updated successfully!',
     '1009': 'Unauthorized user!',
     '1010': 'Error occur in create token!',
     '1011': 'Error occur in uploading file!',
     '1012': 'Please enter correct password!',

     // Post
     '2001': 'Post created successfully',
     '2002': 'Post get successfully',
     '2003': 'Post delete successfully',
     '2004': 'Please select post',
     '2005': 'Post not found',

     // Chat
     '3001': 'Get chat successfully',
     '3002': 'Conversation not found',
     '3003': 'Get chat users successfully',

     // Common
     '9000': 'Please Enter Valid data!',
     '9001': 'Not found',
     '9999': 'Something went wrong!',

}

export function getMessage(messageCode: number) {
     if (isNaN(messageCode)) {
          return messageCode;
     }
     return messageCode ? MESSAGES[messageCode] : '';
};
