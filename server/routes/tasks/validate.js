function validate(text, deadline, progress) {
  
  if (typeof text != "string" || 
      text.length > 100 || 
      text.length == 0) 
        return false;

  if (typeof deadline != "string" || 
      deadline.length == 0) 
        return false;

  if (typeof progress != "number" || 
      progress < 0 || 
      progress > 100) 
        return false;

  return true;
}

module.exports = {
  validate: validate
}; 