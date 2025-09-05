// LiveChat Branding Remover and Positioning Fix
(function() {
  'use strict';
  
  // Function to hide branding elements
  function hideBranding() {
    const brandingSelectors = [
      '.lc-powered-by',
      '.lc-branding',
      '[data-testid="powered-by"]',
      '.livechat-powered-by',
      '.lc-footer',
      '.lc-brand',
      '.lc-logo',
      '[class*="powered"]',
      '[class*="branding"]',
      '[class*="logo"]',
      '.lc-1wgs9sf',
      '.lc-1h4pb4y',
      '[data-automation-id="powered-by"]',
      '[aria-label*="powered by"]',
      '[title*="powered by"]'
    ];
    
    brandingSelectors.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(el => {
        el.style.display = 'none';
        el.style.visibility = 'hidden';
        el.style.opacity = '0';
        el.style.height = '0';
        el.style.overflow = 'hidden';
      });
    });
  }
  
  // Function to fix LiveChat positioning
  function fixLiveChatPositioning() {
    // Find LiveChat widget containers
    const liveChatSelectors = [
      '#chat-widget-container',
      '.livechat-widget',
      '[data-livechat]',
      'iframe[src*="livechatinc.com"]',
      '.lc-maximized',
      '[id*="livechat"]',
      '[class*="livechat"]'
    ];
    
    liveChatSelectors.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(el => {
        // Force right positioning
        el.style.position = 'fixed';
        el.style.bottom = '20px';
        el.style.right = '20px';
        el.style.left = 'auto'; // Override any left positioning
        el.style.zIndex = '9999';
        el.style.width = '400px';
        el.style.height = '580px';
      });
    });
  }
  
  // Run functions immediately
  hideBranding();
  fixLiveChatPositioning();
  
  // Run on DOM changes
  const observer = new MutationObserver(function(mutations) {
    let shouldRun = false;
    mutations.forEach(function(mutation) {
      if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
        shouldRun = true;
      }
    });
    
    if (shouldRun) {
      setTimeout(() => {
        hideBranding();
        fixLiveChatPositioning();
      }, 100);
    }
  });
  
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
  
  // Run periodically as backup
  setInterval(() => {
    hideBranding();
    fixLiveChatPositioning();
  }, 2000);
  
})();